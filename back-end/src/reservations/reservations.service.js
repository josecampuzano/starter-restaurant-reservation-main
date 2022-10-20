const knex = require("../db/connection")

function list(date) {
    return knex("reservations").select("*").where({ reservation_date: date}) //.where
}

// returns the reservations for a specific date 
// date is passed in through query parameters
// function listByDate(date) {
//     return knex("reservations").select("*").where({ reservation_date: date})
// }

module.exports = {
    list,
}