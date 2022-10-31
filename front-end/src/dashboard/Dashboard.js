import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom"
import ReservationsTable from "../components/ReservationsTable";
import TablesTable from "../components/TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  // const [tablesError, setTablesError] = useState(null)
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory()
  console.log(reservationsError)

  /**
 * loads the dashboard
 * updates the search query
 * calls listReservation with object that passes down the date 
 */
  useEffect(loadDashboard, [date]);
 

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // handles click of previous button and sets the current date to one day before by calling the previousDate function
  const prevDateButtonClickHandler = () => {
    history.push(`/dashboard?date=${previous(date)}`)

  }

  // handles click of the today button and sets the current date to date(today's date)
  const todayDateButtonClickHandler = () => {
    history.push(`/dashboard?date=${today()}`)
  }

  // handles click of next button and sets the current date to one day later by calling the nextDate function
  const nextDateButtonClickHandler = () => {
    history.push(`/dashboard?date=${next(date)}`)
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
        <button type="button" className="btn btn-secondary" onClick={prevDateButtonClickHandler}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={todayDateButtonClickHandler}>Today</button>
        <button type="button" className="btn btn-secondary" onClick={nextDateButtonClickHandler}>Next</button>
      <ReservationsTable reservationData={reservations} date={date}/>
      <TablesTable tablesData={tables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
      {/* <ErrorAlert error={tablesError} /> */}
    </main>
  );
}

export default Dashboard;

// create the table component and then add it to the return statement here
  // can you pass down the reservation data for a specific date down as a prop?