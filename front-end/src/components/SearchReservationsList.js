import React from "react";
import FoundReservations from "../assets/FoundReservations.png"

function SearchReservationList({ reservations }) {
    

    const reservationTableRows = reservations
    .map((reservation, index) => (
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>
          {reservation.first_name} {reservation.last_name}
        </td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      </tr>
    ));
    
    return (
        <React.Fragment>
          <br></br>
          <img
          className="img-fluid mx-auto d-block"
          src={FoundReservations}
          alt={"Person bending over with a magnifying glass"}
          >
          </img>
            <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{reservationTableRows}</tbody>
      </table>
        </React.Fragment>
    )
}

export default SearchReservationList