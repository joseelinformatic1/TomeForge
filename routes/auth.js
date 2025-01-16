// Importa les dependències necessàries
const express = require('express'); // Framework web per a Node.js
const bcrypt = require('bcryptjs'); // Llibreria per a hash de contrasenyes
const jwt = require('jsonwebtoken'); // Llibreria per generar i validar tokens JWT
const { User } = require('../models'); // Importa el model "User" definit a la carpeta models

// Crea un router per definir rutes específiques
const router = express.Router();

// Ruta per al registre d'usuaris
router.post('/register', async (req, res) => {
    console.log('Datos recibidos:', req.body); // Mostra les dades rebudes al servidor (només per a depuració)
    const { name, email, password } = req.body; // Extrau les dades del cos de la sol·licitud
    try {
        // Genera un hash segur per a la contrasenya proporcionada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nou usuari a la base de dades amb el nom, email i la contrasenya hashejada
        const user = await User.create({ name, email, password: hashedPassword });

        // Retorna una resposta amb un estat 201 (creat) i un missatge d'èxit
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        console.error('Error en el registro:', error); // Registra l'error al servidor per a depuració

        // Si l'error és de validació de Sequelize
        if (error.name === 'SequelizeValidationError') {
            const errors = {}; // Objecte per emmagatzemar els errors de validació
            error.errors.forEach((validationError) => {
                errors[validationError.path] = validationError.message; // Guarda cada error pel seu camí
            });

            // Retorna una resposta amb un estat 400 (mala petició) i els errors de validació
            res.status(400).json({ message: 'Error de validación', errors });
        } else {
            // Per a qualsevol altre tipus d'error, retorna un estat 500 (error intern del servidor)
            res.status(500).json({ message: 'Error al registrar' });
        }
    }
});

// Ruta per al login d'usuaris
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extrau l'email i la contrasenya del cos de la sol·licitud
    try {
        // Busca un usuari a la base de dades pel seu email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' }); // Retorna error si no existeix l'usuari

        // Compara la contrasenya proporcionada amb la contrasenya hashejada emmagatzemada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' }); // Retorna error si no coincideixen

        // Genera un token JWT que conté l'ID de l'usuari i expira en 1 hora
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token); // Mostra el token generat al servidor (només per a depuració)

        // Retorna una resposta amb un estat 200 (èxit) i el token
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        // Retorna un estat 500 (error intern del servidor) i l'error
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

// Exporta el router perquè pugui ser utilitzat en altres parts de l'aplicació
module.exports = router;
