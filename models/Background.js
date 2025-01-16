const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Asegúrate de importar correctamente

class Background extends Model {}

Background.init({
    background_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre del fondo no puede estar vacío.'
            },
            notEmpty: {
                msg: 'El nombre del fondo no puede estar vacío.'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Background',
    timestamps: false, // Si deseas tener registros de fechas de creación y actualización
});

module.exports = Background;