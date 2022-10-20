import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom"
import ReservationsTable from "../components/ReservationsTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, nextDate, previousDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date)
  const history = useHistory()

  // sets the query parameter to the currentDate paramater (intended so that API calls are made to the specific date in the query param)
  history.push({
    pathname: '/dashboard',
    search: `?date=${currentDate}`
  })


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // handles click of previous button and sets the current date to one day before by calling the previousDate function
  const prevDateButtonClickHandler = (date) => {
    setCurrentDate(previousDate(date))
  }

  // handles click of the today button and sets the current date to date(today's date)
  const todayDateButtonClickHandler = (todaysDate) => {
    setCurrentDate(todaysDate)
  }

  // handles click of next button and sets the current date to one day later by calling the nextDate function
  const nextDateButtonClickHandler = (date) => {
    setCurrentDate(nextDate(date))
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currentDate}</h4>
      </div>
        <button type="button" className="btn btn-secondary" onClick={() => prevDateButtonClickHandler(currentDate)}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={() => todayDateButtonClickHandler(date)}>Today</button>
        <button type="button" className="btn btn-secondary" onClick={() => nextDateButtonClickHandler(currentDate)}>Next</button>
      <ReservationsTable reservationData={reservations}/>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;

// create the table component and then add it to the return statement here
  // can you pass down the reservation data for a specific date down as a prop?