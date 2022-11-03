import React from "react";
//TODO pass down the resevations array and check the length to conditionally render the table or the no reservations found

function SearchReservationList({ reservations }) {
    

    const reservationTableRows = reservations
    .map((reservation, index) => (
      <tr key={index}>
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