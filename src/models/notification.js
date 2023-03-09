'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    dataTitle: DataTypes.STRING,
    dataBody: DataTypes.STRING,
    sentTime: DataTypes.DATE,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: "Notification"
  });
  return Notification;
};