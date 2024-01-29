"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "status", {
      type: DataTypes.STRING,
      defaultValue: "active",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "status", {
      type: DataTypes.STRING,
      defaultValue: null,
    });
  },
};
