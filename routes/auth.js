const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar', error });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

module.exports = router;
