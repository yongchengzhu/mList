const moment = require('moment');
const authorization = require('../../middlewares/authorization');
const { Book } = require('../../models');

const success = book => ({ statusCode: 200, body: JSON.stringify(book)});

const handler = async event => {
  try {
    let { headers, path, body } = event;
    const userId = authorization(headers);
    const id = path.split('/')[4];
    try { body = JSON.parse(body) } catch {};
    if (body && body.lastReadDate)
      body.lastReadDate = moment
        .utc(body.lastReadDate, 'DD-MM-YYYY HH:mm:ss')
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
    switch (event.httpMethod) {
      case 'GET':
        return success(await Book.findAll({ where: { userId } }));
      case 'POST':
        delete body.id;
        const book = await Book.create({ ...body, userId });
        return success(book);
      case 'PUT':
        return success((await Book.update(body, { where: { id }, returning: true }))[1][0]);
      case 'DELETE':
        return success(await Book.destroy({ where: { id } }));
    }
  } catch (error) {
    return { statusCode: error.statusCode || 500, body: error.body || error.toString() };
  }
}

module.exports = { handler }
