const tablesService = require("./tables.service")
const hasProperties = require("../errors/hasProperties")

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

module.exports = {
    list,
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        tableNameCharacterLengthValid,
        capacityIsNum,
        create,
    ]
}