const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class VerificationToken extends Model {}

  VerificationToken.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal("nextval('hibernate_sequence')"),
    },
    expiraryDate: DataTypes.DATE,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'verification_token',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return VerificationToken;
};
