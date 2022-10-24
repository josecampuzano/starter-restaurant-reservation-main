/**
 * List handler for reservation resources
 */

//TODO refactor to iuse res.locals in the middleware after initial check 
const reservationService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const { min } = require("../db/connection");

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
  const people = res.locals.people
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
  res.locals = data

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
  const date = res.locals.reservation_date  
  const parsedDate = Date.parse(date)
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
  const time = res.locals.reservation_time
  const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)
  if(!isValid) {
    return next({
      status: 400,
      message: `The time you entered is not valid. Please enter a valid reservation_time`
    })
  }
  next()
}

// checks that the day does not fall on a Tuesday where monday = 0 and Sunday = 6
function dateIsNotTuesday (req, res, next) {
  const date = res.locals.reservation_date
  const newDate = new Date((date))
  const dateDay = newDate.getDay()
  if(dateDay === 1) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesdays. Please enter a date that is not a Tuesday for your reservation`,
    })
  }
  next()
}

// checks that the reservation_date is in the future 
function dateIsNotInFuture (req, res, next) {
  const date = res.locals.reservation_date
  const resDate = new Date(date)
  const todaysDate = new Date()
  if(resDate < todaysDate){
    return next({
      status: 400,
      message: `The reservation_date must be in the future`
    })
  }
  next()

}

// checks the reservation_time against the ideal operating hours 10:30 AM - 9:30 PM
function timeWithinOperatingHours (req, res, next) {
  const time = res.locals.reservation_time
  const hoursString = time.slice(0,2)
  const minutesString = time.slice(3, 5)
  const hour = Number(hoursString)
  const minutes = Number(minutesString)

  if(hour == 10 && minutes <= 30 || hour < 10) {
    return next({
      status: 400,
      message: `This restaurant is closed at this time. Please select a time when it is open. We open at 9:30 AM and close at 10:30 PM`
    })
  } 

  else if (hour == 21 && minutes >= 30 || hour == 22 && minutes < 30) {
    return next({
      status: 400,
      message: `This time is too close to when the restaurant will be closed. Please select a time with more than an hour left until closing`
    })
  }

  else if(hour == 22 && minutes >= 30 || hour > 22){
    return next({
      status: 400, 
      message: `This restaurant is closed at this time. Please select a time when it is open. We open at 9:30 AM and close at 10:30 PM`
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
  create: [
    hasOnlyValidProperties, 
    hasRequiredProperties, 
    peopleIsNum, 
    dateIsValid, 
    timeIsValid, 
    dateIsNotTuesday,
    dateIsNotInFuture,
    timeWithinOperatingHours,
    create],
};
