const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { Character } = require('../models');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const characters = await Character.findAll({
            where: { user_id: req.user.id },
            attributes: ['id', 'user_id', 'name', 'race_id', 'subrace_id', 'class_id', 'subclass_id', 'background_id', 'level', 'createdAt', 'updatedAt'],  // Especifica solo los campos necesarios
        });
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los personajes', error });
    }
});

// Crear un personaje para el usuario autenticado
router.post('/', authMiddleware, async (req, res) => {
    const { name, race_id, subrace_id, class_id, subclass_id, background_id, level } = req.body;
    console.log('Datos de la petición:', req.body);

    try {
        const character = await Character.create({
            
            user_id: req.user.id,             // Asocia el personaje al usuario autenticado
            name,
            race_id,
            subrace_id,
            class_id,
            subclass_id,
            background_id,
            level
        });
     
        console.log(character);
        res.status(201).json({ message: 'Personaje creado', character });
    } catch (error) {
        
        console.error('Error al crear personaje:', error);  // Imprime el error completo para depuración

        // Verifica si hay errores y maneja el caso de error correctamente
        if (error.errors && error.errors[0]) {
            res.status(400).json({ message: 'Error al crear el personaje', error: error.errors[0].message });
        } else {
            res.status(500).json({ message: 'Error desconocido', error: error.message });
        }
    }
});


// Ruta para eliminar un personaje

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;  // Obtener el id del personaje desde los parámetros de la URL
    try {
        // Verificar que el personaje existe y pertenece al usuario autenticado
        const character = await Character.findOne({
            where: { id, user_id: req.user.id },  // Asegurarse de que sea el personaje correcto y pertenezca al usuario
            attributes: ['id', 'user_id', 'name', 'race_id', 'subrace_id', 'class_id', 'subclass_id', 'background_id', 'level', 'createdAt', 'updatedAt'],
        });

        if (!character) {
            return res.status(404).json({ message: 'Personaje no encontrado o no autorizado para eliminar' });
        }

        // Eliminar el personaje
        await character.destroy();  // Usamos el método destroy para eliminar el registro

        res.status(200).json({ message: 'Personaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el personaje', error: error.message });
    }
});




module.exports = router;
