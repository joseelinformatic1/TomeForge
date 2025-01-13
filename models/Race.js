const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Race = sequelize.define('Race', {
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

module.exports = Race;
