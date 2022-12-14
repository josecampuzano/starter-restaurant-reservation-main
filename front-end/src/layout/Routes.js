import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservationPage from "../pages/CreateReservationPage";
import useQuery from "../utils/useQuery"
import CreateTablePage from "../pages/CreateTablePage";
import SeatReservationPage from "../pages/SeatReservationsPage";
import SearchPage from "../pages/SearchPage";
import ReservationEditPage from "../pages/ReservationEditPage";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */


function Routes() {

  const query = useQuery();
  const date = query.get("date")



  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} /> 
      </Route>
      <Route path="/reservations/new">
        <CreateReservationPage />
      </Route>
      <Route path="/tables/new">
        <CreateTablePage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservationPage />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <ReservationEditPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
