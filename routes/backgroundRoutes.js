const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Background = require('../models/Background'); // Asegúrate de que la importación sea correcta

const router = express.Router();

// Ruta GET para obtener todos los fondos
router.get('/', authMiddleware, async (req, res) => {
    try {
        const backgrounds = await Background.findAll();
        if (backgrounds.length === 0) {
            return res.status(404).json({ message: 'No se encontraron backgrounds' });
        }
        res.status(200).json(backgrounds);
    } catch (error) {
        console.error('Error al obtener los backgrounds:', error);
        res.status(500).json({ message: 'Error al obtener los backgrounds', error: error.message });
    }
});
module.exports = router;