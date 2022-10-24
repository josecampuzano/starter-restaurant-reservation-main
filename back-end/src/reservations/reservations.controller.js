/**
 * List handler for reservation resources
 */

//TODO refactor to iuse res.locals in the middleware after initial check 
const reservationService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]
// validates the required properties for a new reservation based on VALID_PROPERTIES array
const hasRequiredProperties = hasProperties(...VALID_PROPERTIES)

// checks that the people value entered is a number
function peopleIsNum (req, res, next) {
  const { data = {} } = req.body
  const people = data.people
  if(typeof people !== "number"){ 
    return next({
      status: 400,
      message: `We would love to know how many people will be joining us for this reservation! Please provide a number when filling out the People Field!`
    })
  }
  next()
}

// checks that the form inputs on contain the valid properties 
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field))

  if(invalidFields.length) {
    return next({
      status: 400, 
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    })
  }
  next()
}

// checks that the date entered is a valid date
function dateIsValid(req, res, next) {
  const { data = {} } = req.body
  const date = data.reservation_date  
  const parsedDate = Date.parse(date)
  // console.log("parsedDate", parsedDate)
  // console.log(typeof parsedDate)

  if(!parsedDate) {
    return next ({
      status: 400, 
      message: `Hey there! You must enter a valid date in reservation_date`,
    })
  }
  next()
}

// checks that the time entered is a valid time
function timeIsValid(req, res, next) {
  const { data = {} } = req.body
  const time = data.reservation_time
  
  const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)

  if(!isValid) {
    return next({
      status: 400,
      message: `The time you entered is not valid. Please enter a valid reservation_time`
    })
  }
  next()
}

async function list(req, res) {
  const data = await reservationService.list(req.query.date);
  res.json({ data });
}

async function create(req, res, next) {
  reservationService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

module.exports = {
  list,
  create: [hasOnlyValidProperties, hasRequiredProperties, peopleIsNum, dateIsValid, timeIsValid, create],
};
