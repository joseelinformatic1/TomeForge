const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:' , decoded);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) throw new Error();
        next();
    } catch (error) {
        console.error('Error :', error.message);
        console.error('Error :', error.message);
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
