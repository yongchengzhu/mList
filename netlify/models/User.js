const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal("nextval('hibernate_sequence')"),
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return User;
};
