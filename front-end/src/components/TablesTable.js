import React, { useState } from "react";
import { deleteTableRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesTable({ tablesData, loadDashboard }) {
  const [deleteError, setDeleteError] = useState(null)

  function finishOnClickHandler(tableId) {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      const abortController = new AbortController()
      setDeleteError(null)
      deleteTableRes(tableId)
        .then(() => {
          loadDashboard()
        })
        .catch(setDeleteError)
      return () => abortController.abort()
    }
  }


   
  
  const tableInfo = tablesData
    .map((table, index) => (
    <tr key={index}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`} >{table.reservation_id ? "Occupied" : "Free"}</td>
      <td> {table.reservation_id ? <button data-table-id-finish={table.table_id} onClick={() => finishOnClickHandler(table.table_id)} className="btn btn-warning"> Finish </button> : null}</td>
    </tr>
    ))



  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Free?</th>  
            <th scope="col">{null}</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo}
        </tbody>
      </table>
      <ErrorAlert error={deleteError} />
    </React.Fragment>
  );
}

export default TablesTable;
