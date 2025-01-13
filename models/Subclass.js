const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subclass = sequelize.define('Subclass', {
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

module.exports = Subclass;
