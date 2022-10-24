import React from "react";

function TablesTable() {


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
          <tr>
            <th scope="row">#</th>
            <td>Table Name</td>
            <td>Capacity</td>
            <td>Free?</td>
          </tr>
        </tbody>
      </table>{" "}
    </React.Fragment>
  );
}

export default TablesTable;
