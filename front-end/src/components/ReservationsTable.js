import React from "react";

function ReservationsTable({ reservationData }) {
    const reservationTableRows = reservationData.map((reservation, index) => (
        <tr>
            <th scope="row">{reservation.reservation_id}</th>
            <td>{reservation.first_name} {reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td>Booked</td>
          </tr>
    ))

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
        <tbody>
          {reservationTableRows}
        </tbody>
      </table>{" "}
    </React.Fragment>
  );
}

export default ReservationsTable;