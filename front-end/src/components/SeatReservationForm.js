import React, { useState } from "react";
import { updateTable } from "../utils/api";
import { useHistory } from "react-router";

function SeatReservationForm({ reservationData, tablesData }) {
    const { first_name, last_name, reservation_id, reservation_date, reservation_time, people } = reservationData
    const [tableId, setTableId] = useState(null)
    const [updateTableError, setUpdateTableError] = useState(null)
    const history = useHistory()
    const tableOptions = tablesData.map((table, index) => (
        <option key={index} value={table.table_id}>{table.table_name}</option>
    ))

    const handleFormChange = ({ target }) => {
        setTableId(target.value)
    }

    const submitSeatResHandler =  (event) => {
        event.preventDefault();
        const abortController = new AbortController() 
       
        setUpdateTableError(null)
        const reqBodyData = {
            // table_id: Number(tableId),
            reservation_id: Number(reservation_id)
        }

        updateTable(reqBodyData, tableId)
            .then(() => {
                history.push("/dashboard")
            })
            .catch(setUpdateTableError)
            return () => abortController.abort()
      };


  return (
    <React.Fragment>
    <h3>#{reservation_id} - {first_name} {last_name} on {reservation_date} at {reservation_time} for {people}  </h3>
      <form onSubmit={submitSeatResHandler}>
        <div className="mb-3">
          <label className="form-label">
            Select table to seat this party at:
          </label>
          <select className="form-control" onChange={handleFormChange}>
            <option>Select Table</option>
            {tableOptions}
          </select>
        </div>

        <button type="submit" className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default SeatReservationForm;
