const knex = require("../db/connection")

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name")
}

function read(tableId) {
    return knex("tables")
    .select("*")
    .where({ table_id: tableId})
    .first()
}

function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0])
}

//to successfully update, you will have to pass in the tableID to match the row 
// and the reservationID to add to the column 
function update(updatedRes, tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update(updatedRes, "*")

        .then((updatedRecord) => updatedRecord[0])
}

module.exports = {
    list,
    create,
    update,
    read,
}