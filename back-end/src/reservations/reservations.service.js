const knex = require("../db/connection")

function list(date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date: date})
    .whereNot("status", "finished")
    .orderBy("reservation_time")
}

function listWithNumber(mobile_number) {
    return knex("reservations")
    .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
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

function updateReservation(reservationId, updatedRes){
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .update(updatedRes, "*")
        .then((updatedRecord) => updatedRecord[0])
}

module.exports = {
    list,
    create,
    read,
    updateStatus, 
    listWithNumber,
    updateReservation,
}