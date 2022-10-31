import React from "react";

function TablesTable({ tablesData }) {
  
  const tableInfo = tablesData
    .map((table, index) => (
    <tr key={index}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`} >{table.reservation_id ? "Occupied" : "Free"}</td>
      <td> {table.reservation_id ? <button data-table-id-finish={table.table_id} className="btn btn-warning"> Finish </button> : null}</td>
    </tr>
    ))

    // have a function that handles the finish button function Finish(tableId, updatedResData) where updatedRes is reservationId: null 

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
    </React.Fragment>
  );
}

export default TablesTable;
