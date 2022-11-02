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



// seats the table --- rename this so that it makes more sense 
function update(updatedRes, tableId) {
    return knex.transaction(async (transaction) => {
        await knex("reservations")
          .where({ reservation_id: updatedRes.reservation_id })
          .update({ status: "seated" })
          .transacting(transaction);

    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update(updatedRes, "*")
        .transacting(transaction)
        .then((updatedRecord) => updatedRecord[0])
    })
}


// unseats the table --- rename later so that this makes more sense
function destroy(tableId, reservationId) {
    return knex.transaction(async (transaction) => {
        await knex("reservations")
          .where({ reservation_id: reservationId })
          .update({ status: "finished" })
          .transacting(transaction);
    return knex("tables")
        .select("*")
        .where({ table_id: tableId })
        .update("reservation_id", null)
        .then((updatedRecord) => updatedRecord[0])
    })
}

module.exports = {
    list,
    create,
    update,
    read,
    delete: destroy
}