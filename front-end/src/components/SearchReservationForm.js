import React from "react";

function SearchReservationForm({ handleFormChange, mobile_number, searchFormSubmitHandler }) {


  return (
    <React.Fragment>
      <br></br>
      <h1>Search Reservations</h1>
      <form onSubmit={searchFormSubmitHandler}>
        <div className="mb-3">
          <label className="form-label">Search reservations by phone number</label>
          <input
            type="string"
            className="form-control"
            id="search-mobile-number"
            name="mobile_number"
            onChange={handleFormChange}
            value={mobile_number}
            placeholder="Enter a customer's phone number"
            aria-describedby="emailHelp"
          ></input>
        </div>

        <button type="submit" 
        className="btn search-form-find-btn">
          Find
        </button>
      </form>
    </React.Fragment>
  );
}

export default SearchReservationForm;
