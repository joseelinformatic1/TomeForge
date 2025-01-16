const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token de la cabecera
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);

        // Buscar al usuario en la base de datos
        req.user = await User.findByPk(decoded.id);
        if (!req.user) {
            throw new Error('Usuario no encontrado');
        }

        next();  // Si todo está bien, pasamos al siguiente middleware o controlador
    } catch (error) {
        console.error('Error de autenticación:', error.message);

        // Verificar si el error es por token expirado
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, por favor inicie sesión nuevamente' });
        }

        // Si el error es otro, devolver "Token inválido"
        res.status(401).json({ message: 'Token inválido o no autorizado' });
    }
};

module.exports = authMiddleware;
