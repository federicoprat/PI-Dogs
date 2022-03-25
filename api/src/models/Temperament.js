const { DataTypes } = require("sequelize");
//const { v4: UUIDV4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define(
    "Temperament",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
