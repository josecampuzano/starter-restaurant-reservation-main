import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation } from "../utils/api";
import ReservationsListBanner from "../assets/ReservationsListBanner.png"


function ReservationsTable({ reservationData, date, loadDashboard }) {
  const [cancelError, setCancelErro] = useState(null)

  function onCancelClickHandler (reservationId) {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
    const abortController = new AbortController()
    setCancelErro(null)
    const reqBodyData = {
      status: "cancelled"
    }
    cancelReservation(reservationId, reqBodyData, abortController.signal)
      .then(() => {
        loadDashboard()
      })
      .catch(setCancelErro)
    return () => abortController.abort
    }
  }

  
  const reservationTableRows = reservationData
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
        <td>
          {reservation.status === "booked" ? <a className="btn btn-secondary" role="button" href={`/reservations/${reservation.reservation_id}/seat`}>
            Seat
          </a> : null}
        </td>
        <td>
          {reservation.status === "booked" ? <a className="btn res-list-edit-btn" role="button" href={`/reservations/${reservation.reservation_id}/edit`}>
            Edit
          </a> : null}
        </td>
        <td>
          {reservation.status === "booked" ? <button data-reservation-id-cancel={reservation.reservation_id} className="btn btn-danger" onClick={() => onCancelClickHandler(reservation.reservation_id)} >
            Cancel
          </button> : null}
        </td>
      </tr>
    ));

  return (
    <React.Fragment>
      <img
      className="img-fluid mx-auto d-block"
      src={ReservationsListBanner}
      alt={"Reservations Banner with a check mark"}
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
            <th scope="col">{null}</th>
            <th scope="col">Actions</th>
            <th scope="col">{null}</th>
          </tr>
        </thead>
        <tbody>{reservationTableRows}</tbody>
      </table>
      <ErrorAlert error={cancelError}/>
    </React.Fragment>
  );
}

export default ReservationsTable;
