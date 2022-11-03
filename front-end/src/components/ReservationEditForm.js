import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import { useHistory } from "react-router";

function ReservationEditForm(){

    const [reservationError, setReservationError] = useState(null)
    const params = useParams()
    const reservation_id = params.reservation_id
    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      };
    
      // defines useState variable for Create Reservation Form Data
      const [newResFormData, setNewResFormData] = useState({ ...initialFormState });

    useEffect(loadReservation, [reservation_id])

    function loadReservation () {
        const abortController = new AbortController()
        setReservationError(null)
        readReservation(reservation_id, abortController.signal)
            .then((response) => {
                setNewResFormData(response)
            })
            .catch(setReservationError)
        return () => abortController.abort()
    }

const cancelButtonClick = () => history.go(-1)

  // handles a change in the form and stores those values within newResFormData useState variable
  const handleFormChange = ({ target }) => {
    setNewResFormData({
      ...newResFormData,
      [target.name]: target.value,
    });
  };


  // handles the submission of the form
  // makes a call to the API with the /reservations endpoint with an POST method
  const newResSubmitHandler =  (event) => {
    event.preventDefault();
    const abortController = new AbortController()
    setReservationError(null)
    const formDataFormatted = {
      ...newResFormData,
      people: Number(newResFormData.people),
    };
    updateReservation(formDataFormatted, reservation_id, abortController.signal)
        .then(() => {
            history.push(`/dashboard?date=${newResFormData.reservation_date}`);
        })
        .catch(reservationError)
    return () => abortController.abort()
  };

    return (
        <React.Fragment>
            <form onSubmit={newResSubmitHandler}>
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">
            First Name
          </label>
          <input
            name="first_name"
            type="name"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            value={newResFormData.first_name}
            onChange={handleFormChange}
            aria-describedby="First Name"
            required
          ></input>
        </div>
        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">
            Last Name
          </label>
          <input
            name="last_name"
            type="name"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            value={newResFormData.last_name}
            onChange={handleFormChange}
            aria-describedby="Last Name"
            required
          ></input>
        </div>
        {/* Mobile Number */}
        <div className="mb-3">
          <label className="form-label">
            Mobile Number
          </label>
          <input
            name="mobile_number"
            type="tel"
            className="form-control"
            id="mobileNumber"
            placeholder="000-000-0000"
            value={newResFormData.mobile_number}
            onChange={handleFormChange}
            aria-describedby="Mobile Number"
            required
          ></input>
        </div>
        {/* Date */}
        <div className="mb-3">
          <label className="form-label">
            Date
          </label>
          <input
            name="reservation_date"
            type="date"
            className="form-control"
            id="date"
            value={newResFormData.reservation_date}
            onChange={handleFormChange}
            aria-describedby="Date"
            required
          ></input>
        </div>
        {/* Time */}
        <div className="mb-3">
          <label className="form-label">
            Time
          </label>
          <input
            name="reservation_time"
            type="time"
            className="form-control"
            id="time"
            value={newResFormData.reservation_time}
            onChange={handleFormChange}
            aria-describedby="Time"
            required
          ></input>
        </div>
        {/* People */}
        <div className="mb-3">
          <label className="form-label">
            People
          </label>
          <input
            name="people"
            type="number"
            className="form-control"
            id="people"
            value={newResFormData.people}
            onChange={handleFormChange}
            aria-describedby="People"
            required
          ></input>
        </div>
        {/* Cancel Button */}
        <button className="btn btn-secondary" onClick={cancelButtonClick}>Cancel</button>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
        </React.Fragment>
    )
}

export default ReservationEditForm