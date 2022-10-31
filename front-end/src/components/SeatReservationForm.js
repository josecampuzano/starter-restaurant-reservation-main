import React, { useState } from "react";
import { updateTable } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservationForm({ reservationData, tablesData }) {
  const {
    first_name,
    last_name,
    reservation_id,
    reservation_date,
    reservation_time,
    people,
  } = reservationData;
  const [tableId, setTableId] = useState(null);
  const [updateTableError, setUpdateTableError] = useState(null);
  const history = useHistory();

  const tableOptions = tablesData.map((table, index) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{`${table.table_name} - ${table.capacity}`}</option>
  ));

  const handleFormChange = ({ target }) => {
    setTableId(target.value);
  };

  const submitSeatResHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    setUpdateTableError(null);
    const reqBodyData = {
      reservation_id: Number(reservation_id),
    };
    console.log("about to update the table")
    updateTable(reqBodyData, tableId)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(setUpdateTableError);
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <h3>
        #{reservation_id} - {first_name} {last_name} on {reservation_date} at
        {reservation_time} for {people}
      </h3>
      <form onSubmit={submitSeatResHandler}>
        <div className="mb-3">
          <label className="form-label">
            Select table to seat this party at:
          </label>
          <select
            id="table_id"
            name="table_id"
            className="form-control"
            onChange={handleFormChange}
            required
          >
            <option>Select Table</option>
            {tableOptions}
          </select>
        </div>

        <button
        type="button"
          onClick={() => history.go(-1)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ErrorAlert error={updateTableError} />
    </React.Fragment>
  );
}

export default SeatReservationForm;
