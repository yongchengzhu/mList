const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class Book extends Model {}
  
  Book.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal("nextval('hibernate_sequence')"),
    },
    comments: DataTypes.STRING,
    cover: DataTypes.STRING,
    lastChapterRead: DataTypes.STRING,
    lastReadDate: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    title: DataTypes.STRING,
    daysToWait: DataTypes.INTEGER,
    language: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'book',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  return Book;
};
