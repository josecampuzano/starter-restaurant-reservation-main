import React from "react";

function ReservationsCardInfo({ reservationData }) {
  const bookedReservations = reservationData.filter(
    (reservation) => reservation.status === "booked"
  );
  const seatedReservations = reservationData.filter(
    (reservation) => reservation.status === "seated"
  );


  const cards = (
    <div className="row">
      <div className="col-sm-6">
        <div className="card res-upcoming-card">
          <div className="card-body">
            <h5 className="card-title">Upcoming Reservations for Today</h5>
                <h1>{bookedReservations.length}</h1>
            
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card res-seated-card">
          <div className="card-body">
            <h5 className="card-title">Reservations Currently Seated</h5>
                <h1>{seatedReservations.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
        {cards}
        <br></br>
    </React.Fragment>
  );
}

export default ReservationsCardInfo;
