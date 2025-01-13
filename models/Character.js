const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Race = require('./Race');
const Subrace = require('./Subrace');
const Class = require('./Class');
const Subclass = require('./Subclass');
const Background = require('./Background');

const Character = sequelize.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    race_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'races',  // Nombre de la tabla races
            key: 'id',
        },
        onDelete: 'SET NULL',  // O 'CASCADE', dependiendo de la lógica que quieras
        onUpdate: 'CASCADE',
    },
    subrace_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subraces',  // Nombre de la tabla subraces
            key: 'id',
        },
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE',
    },
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'classes',  // Nombre de la tabla classes
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    subclass_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subclasses',  // Nombre de la tabla subclasses
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    background_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'backgrounds',  // Nombre de la tabla backgrounds
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});

// Relación entre User y Character
User.hasMany(Character, { foreignKey: 'user_id', as: 'characters' });
Character.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Relación entre Character y Race
Character.belongsTo(Race, { foreignKey: 'race_id', as: 'race' });

// Relación entre Character y Subrace
Character.belongsTo(Subrace, { foreignKey: 'subrace_id', as: 'subrace' });

// Relación entre Character y Class
Character.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

// Relación entre Character y Subclass
Character.belongsTo(Subclass, { foreignKey: 'subclass_id', as: 'subclass' });

// Relación entre Character y Background
Character.belongsTo(Background, { foreignKey: 'background_id', as: 'background' });

module.exports = Character;
