const User = require('./User');
const Character = require('./Character');

User.hasMany(Character, { foreignKey: 'userId', as: 'character' });
Character.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Character };
