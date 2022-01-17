const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Sequelize } = require('sequelize');
const pg = require('pg');
require('../../configs');

const handler = async event => {
  if (event.httpMethod === 'POST')
    try {
      const { emailOrUsername, password } = JSON.parse(event.body);
      const user = await User.findOne({
        where: Sequelize.or(
          { username: { [Sequelize.Op.iLike]: emailOrUsername } },
          { email: { [Sequelize.Op.iLike]: emailOrUsername } }
        ),
      });
      if (!user || !await bcrypt.compare(password, user.password))
        return { statusCode: 404, body: JSON.stringify({ message: 'Bad credentials!' }) };
      if (!user.enabled)
        return { statusCode: 403, body: JSON.stringify({ message: 'Account not activated!'}) };
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })  
        }),
      }
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ message: error.toString() }) };
    }
};

module.exports = { handler }
