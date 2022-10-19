import React from "react";
import { useHistory } from "react-router-dom"


function CreateReservationForm({handleFormChange, first_name, last_name, mobile_number, reservation_date, reservation_time, people}) {

  // initializing history object 
  const history = useHistory()

  // cancel button functionality 
  // onclick should take user to previously visited page
  const cancelButtonClick = () => history.go(-1)
 

  return (
    <React.Fragment>
      <form>
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
            value={first_name}
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
            value={last_name}
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
            value={mobile_number}
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
            value={reservation_date}
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
            value={reservation_time}
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
            value={people}
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
  );
}

export default CreateReservationForm;
