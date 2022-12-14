import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom"
import ReservationsTable from "../components/ReservationsTable";
import TablesTable from "../components/TablesTable";
import ReservationsCardInfo from "../components/ReservationsCardInfo";
import TablesCardInfo from "../components/TablesCardInfo";

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
      <br></br>
      <div className="d-flex justify-content-center">
      <h1>Dashboard</h1>
      </div>
      <div className="d-flex justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <br></br>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-secondary mr-2" onClick={prevDateButtonClickHandler}>Previous</button>
        <button type="button" className="btn btn-secondary mr-2" onClick={todayDateButtonClickHandler}>Today</button>
        <button type="button" className="btn btn-secondary mr-2" onClick={nextDateButtonClickHandler}>Next</button>
      </div>  
      <br></br>    
      <ReservationsTable reservationData={reservations} date={date} loadDashboard={loadDashboard}/>
      <ReservationsCardInfo reservationData={reservations}/>
      <TablesTable tablesData={tables} loadDashboard={loadDashboard}/>
      <TablesCardInfo tablesData={tables}/>
      <ErrorAlert error={reservationsError} />
      {/* <ErrorAlert error={tablesError} /> */}
    </main>
  );
}

export default Dashboard;

// create the table component and then add it to the return statement here
  // can you pass down the reservation data for a specific date down as a prop?