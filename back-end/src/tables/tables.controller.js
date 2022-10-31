const tablesService = require("./tables.service")
const hasProperties = require("../errors/hasProperties")
const reservationService = require("../reservations/reservations.service")
const { table } = require("../db/connection")

// set up valid properties and then call the function has properties on those properties 
const VALID_PROPERTIES = [
    "table_name", 
    "capacity",
]

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body
    res.locals = data

    const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field))

    if(invalidFields.length) {
        return next({
            status: 400,
            message:`Invalid field(s): ${invalidFields.join(", ")}`,
        })
    }
    next()
}

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES)

function tableNameCharacterLengthValid (req, res, next) {
    tableName = res.locals.table_name   
    if(tableName.length <= 1) {
        return next({
            status: 400,
            message: `The table_name field must be at least two characters in length! Thank you!`
        })
    }
    next()
}

function capacityIsNum (req, res, next) {
    const capacity = res.locals.capacity
    if(typeof capacity !== "number"){
        return next({
            status: 400,
            message: `The capacity must be a number! Thank you!`
        })
    }
    next()
}


function dataIsMissing (req, res, next) {
    const { data } = req.body
    if(data){
        res.locals.data = data
       return next() 
    }
    next({
        status: 400,
        message: `There is no data to update`
    })
}

function reservationIdMissing (req, res, next) {
    const data = res.locals.data
    const reservationId = data.reservation_id
    if(!reservationId) {
        return next({
            status: 400, 
            message: `The reservation_id is missing.`
        })
    }
    next()
}

function reservationExists(req, res, next) {
    reservationService
      .read(Number(req.body.data.reservation_id))
      .then((reservation) => {
        if(reservation) {
          res.locals.reservation = reservation
          return next()
        }
        next({
          status: 404, 
          message: `Reservation ${req.body.data.reservation_id} cannot be found`
        })
      })
      .catch(next)
  }


function tableExists(req, res, next) {
    tablesService
        .read(req.params.table_id)
        .then((table) => {
            if(table) {
                res.locals.table = table
                return next()
            }
            next({
                status: 400, 
                message: `The table ${req.params.table_id} does not exist`
            })
        })
        .catch(next)
}


function capacityValidation(req, res, next) {
    const { capacity } = res.locals.table
    const { people } = res.locals.reservation

    if (Number(people) > Number(capacity)) {
        return next({
            status: 400, 
            message: `The number of people in this party exceeds the capacity of the table`
        })
    }
    next()
}

function occupiedValidation(req, res, next) {
    const { reservation_id } = res.locals.table
    if(reservation_id) {
        return next({
            status: 400, 
            message: `The table you selected is currently occupied by another party. Please select a different table.`
        })
    }
    next()
}

async function list(req, res) {
    const data = await tablesService.list()
    res.json({ data })
}

async function create(req, res, next) {
    tablesService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next)
}

async function update(req, res, next) {
    // define the tableID and pass it down to the service seperately
    const tableId = req.params.table_id
    const updatedRes = {
        ...req.body.data,
    }
    tablesService
        .update(updatedRes, tableId)
        .then((data) => res.status(200).json({ data }))
        .catch(next)
}

module.exports = {
    list,
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        tableNameCharacterLengthValid,
        capacityIsNum,
        create,
    ],
    update: [
        dataIsMissing,
        reservationIdMissing,
        reservationExists,
        tableExists, 
        capacityValidation,
        occupiedValidation,
        update
    ]
}