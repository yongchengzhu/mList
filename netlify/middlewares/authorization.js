const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = headers => {
  const unauthorized = { statusCode: '401', body: 'Unauthorized' };
  if (!headers.authorization)
    throw unauthorized;
  try {
    const token = jwt.verify(headers.authorization.split('Bearer ')[1], process.env.JWT_SECRET);
    if (!User.findOne({ where: { id: parseInt(token.id) } }))
      throw unauthorized;
    return token.id;
  } catch {
    throw unauthorized;
  }
};