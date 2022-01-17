const { User, VerificationToken } = require('../../models');
require('pg');

const handler = async event => {
  if (event.httpMethod === 'PUT')
    try {
      const { token } = event.queryStringParameters;
      await User.update({ enabled: true }, {
        where: {
          id: (await VerificationToken.findOne({ where: { token } })).userId
        }
      });
      await VerificationToken.destroy({ where: { token }});
      return { statusCode: 204 }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }
