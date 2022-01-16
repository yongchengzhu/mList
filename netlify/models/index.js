const { Sequelize } = require('sequelize');
require('../configs');
const sequelize = new Sequelize(process.env.DATABASE_URI);

const User = require('./User')(sequelize);
const Book = require('./Book')(sequelize);
const VerificationToken = require('./VerificationToken')(sequelize);

User.hasMany(Book);
User.hasOne(VerificationToken);
Book.belongsTo(User);
VerificationToken.belongsTo(User);

module.exports = { User, Book, VerificationToken };
