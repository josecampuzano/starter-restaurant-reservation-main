/**
 * List handler for reservation resources
 */

const reservationService = require("./reservations.service");

// checks that the people value entered is a number
function peopleCheck (req, res, next) {
  const { people } = res.locals.data
  if(typeof people !== "number"){ 
    return next({
      status: 400,
      message: `We would love to know how many people will be joining us for this reservation! Please provide a number when filling out the People Field!`
    })
  }
  if(Number(people) === 0) {
    return next({
      status: 400,
      message: `The number of people in the party must be at least 1`
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

// checks that the date entered is a valid date
function dateIsValid(req, res, next) {
  const date = res.locals.data.reservation_date  
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
  const time = res.locals.data.reservation_time
  const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)
  if(!isValid) {
    return next({ 
      status: 400,
      message: `The time you entered is not valid. Please enter a valid reservation_time`
    })
  }
  next() 
}

function firstNameCheck (req, res, next) {
  const { first_name } = res.locals.data
  if(!first_name) {
    return next({
      status: 400,
      message: `You must include a First Name for the first_name field!`
    })
  }
  if(first_name === "") {
    return next({
      status: 400,
      message: `The first_name you enter cannot be empty`
    })
  }
  next()
}

function lastNameCheck (req, res, next) {
  const { last_name } = res.locals.data 
  if(!last_name) {
    return next({
      status: 400,
      message: `You must include a Last Name for the last_name field!`
    })
  }
  if(last_name === "") {
    return next({
      status: 400,
      message: `The last_name you enter cannot be empty`
    })
  }
  next()
}

function mobilePhoneCheck (req, res, next) {
  const { mobile_number } = res.locals.data 
  if(!mobile_number) {
    return next({
      status: 400,
      message: `You must include a Mobile Number for the mobile_number field!`
    })
  }
  if(mobile_number === "") {
    return next({
      status: 400,
      message: `The mobile_number you enter cannot be empty`
    })
  }
  next()
}

// checks that the day does not fall on a Tuesday where monday = 0 and Sunday = 6
function dateIsNotTuesday (req, res, next) {
  const date = res.locals.data.reservation_date
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
  const date = res.locals.data.reservation_date
  const time = res.locals.data.reservation_time
  const resDate = new Date(`${date} ${time}`)
  const todaysDate = new Date()
  if(resDate - todaysDate < 0){
    return next({
      status: 400,
      message: `The reservation_date must be in the future`
    })
  }
  next()

}

// checks the reservation_time against the ideal operating hours 10:30 AM - 9:30 PM
function timeWithinOperatingHours (req, res, next) {
  const time = res.locals.data.reservation_time
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

function reservationExists(req, res, next) {
  reservationService
    .read(Number(req.params.reservation_Id))
    .then((reservation) => {
      if(reservation) {
        res.locals.reservation = reservation
        return next()
      }
      next({
        status: 404, 
        message: `Reservation ${req.params.reservation_Id} cannot be found`
      })
    })
    .catch(next)
}

function checkStatusIsBooked(req, res, next) {
  const { status } = res.locals.data
  if(status === "booked" || !status) {
    return next()
  } 
  next({
    status: 400,
    message: `The status of a new reservation should be booked and not seated or finished`
  })
}

function checkCurrentStatus(req, res, next) {
  const { status } = res.locals.reservation
  if(status === "finished") {
    return next({
      status: 400, 
      message: `The status of a reservation cannot be finished, it must be booked or seated.`
    })
  }
  next()
}
function checkStatusUnknown(req, res, next) {
  const { status } = req.body.data
  if(status === "unknown") {
    return next({
      status: 400, 
      message: `The status of a reservation must be booked or seated and cannot be unknown`
    })
  }
  next()
}

async function read(req, res, next){ 
  const { reservation: data } = res.locals
  res.json({ data })
}

async function list(req, res) {
  const { mobile_number } = req.query 
  const { date } = req.query          
  if(date){
    const data = await reservationService.list(req.query.date);
    res.json({ data });
  }
  if(mobile_number){
    const data = await reservationService.listWithNumber(mobile_number)
    res.json({ data })
  }

}

async function create(req, res, next) {
  reservationService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function updateStatus(req, res, next) {
  const { reservation_Id } = req.params
  const status = { status: req.body.data.status }

  reservationService
    .updateStatus(reservation_Id, status)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
}

async function updateReservation(req, res, next) {
  const { reservation_Id } = req.params
  const updatedRes = {...req.body.data}

  reservationService
    .updateReservation(reservation_Id, updatedRes)
    .then((data) => res.status(200).json({ data }))
    .catch(next)
}

module.exports = {
  list,
  create: [
    dataIsMissing,
    peopleCheck, 
    firstNameCheck,
    lastNameCheck,
    mobilePhoneCheck,
    dateIsValid, 
    timeIsValid, 
    dateIsNotTuesday,
    dateIsNotInFuture,
    timeWithinOperatingHours,
    checkStatusIsBooked,
    create
  ],
  read: [
    reservationExists,
    read,
  ],
  updateStatus: [
    reservationExists,
    checkCurrentStatus,
    checkStatusUnknown,
    updateStatus
  ],
  reservationExists,
  updateReservation: [
    reservationExists,
    dataIsMissing,
    peopleCheck,
    firstNameCheck,
    lastNameCheck,
    mobilePhoneCheck,
    dateIsValid, 
    timeIsValid, 
    dateIsNotTuesday,
    dateIsNotInFuture,
    updateReservation,
  ],

};
