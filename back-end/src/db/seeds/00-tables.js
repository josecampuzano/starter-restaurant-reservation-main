const tableData = require("./00-tables.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tables").insert(tableData);
    });
};
