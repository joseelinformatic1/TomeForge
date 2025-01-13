const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subrace = sequelize.define('Subrace', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Subrace;
