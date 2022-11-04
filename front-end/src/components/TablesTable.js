import React, { useState } from "react";
import { deleteTableRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TablesListBanner from "../assets/TablesListBanner.png"

function TablesTable({ tablesData, loadDashboard }) {
  const [deleteError, setDeleteError] = useState(null)

  function finishOnClickHandler(tableId) {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      const abortController = new AbortController()
      setDeleteError(null)
      deleteTableRes(tableId, abortController.signal)
        .then(() => {
          loadDashboard()
        })
        .catch(setDeleteError)
      return () => abortController.abort()
    }
  }


   
  
  const tableInfo = tablesData
    .map((table, index) => (
    <tr key={table.table_id}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`} >{table.reservation_id ? "Occupied" : "Free"}</td>
      <td> {table.reservation_id ? <button data-table-id-finish={table.table_id} onClick={() => finishOnClickHandler(table.table_id)} className="btn tbls-finish-btn"> Finish </button> : null}</td>
    </tr>
    ))



  return (
    <React.Fragment>
      <img
      className="img-fluid mx-auto d-block"
      src={TablesListBanner}
      alt={"Tables Banner with a table"}
      >
      </img>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>  
            <th scope="col">Actions</th>
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
