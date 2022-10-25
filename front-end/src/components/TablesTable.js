import React from "react";

function TablesTable({ tablesData }) {
  
  const tableInfo = tablesData
    .map((table, index) => (
    <tr key={index}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>Free?</td>
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
