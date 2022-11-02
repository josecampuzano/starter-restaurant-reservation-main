const knex = require("../db/connection")

function list(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date: date})
    .orderBy("reservation_time")
}

function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservationId) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId})
    .first()
}

function updateStatus(reservationId, status){
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .update(status, "*")
        .then((updatedRecord) => updatedRecord[0])
}


module.exports = {
    list,
    create,
    read,
    updateStatus, 
}