import React, { useEffect, useState } from "react";
import SeatReservationForm from "../components/SeatReservationForm";
import { useParams } from "react-router";
import { readReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

//TODO need to pass down the reservation information to show at the top of this page

function SeatReservationPage(){
    const [reservationError, setReservationError] = useState(null)
    const [reservation, setReservation] = useState([])
    const [tables, setTables] = useState([])
    const [tablesError, setTablesError] = useState(null)
    const params = useParams()
    const reservation_id = params.reservation_id


    useEffect(loadReservation, [reservation_id])

    function loadReservation () {
        const abortController = new AbortController()
        setReservationError(null)
        readReservation(reservation_id, abortController.signal)
            .then((response) => {
                setReservation(response)
            })
            .catch(setReservationError)
            listTables(abortController.signal)
            .then((response) => {
              setTables(response)
            })
            .catch(setTablesError)
        return () => abortController.abort()
    }
  

    return (
        <React.Fragment>
        <h1>Seat Reservation</h1>
        <SeatReservationForm reservationData={reservation} tablesData={tables}/>
        <ErrorAlert error={reservationError}/>
        <ErrorAlert error={tablesError}/>
        </React.Fragment>
    )
}

export default SeatReservationPage