import React from "react";
import { useHistory } from "react-router";

function CreateTableForm({ handleFormChange, table_name, capacity, newTableSubmitHandler }) {
  const history = useHistory()

  const cancelButtonClick = () => history.go(-1)


  return (
    <React.Fragment>
      <form onSubmit={newTableSubmitHandler}>
        <div className="mb-3">
          <label className="form-label">Table Name</label>
          <input
            name="table_name"
            type="name"
            className="form-control"
            id="tableName"
            placeholder="Table Name"
            value={table_name}
            onChange={handleFormChange}
            aria-describedby="tableName"
            required
          ></input>
          <br></br>
          <label className="form-label">Capacity</label>
          <input 
            name="capacity"
            type="number" 
            className="form-control" 
            id="capacity"
            value={capacity}
            onChange={handleFormChange}
            required
          ></input>
        </div>
        <button className="btn btn-secondary mr-2" onClick={cancelButtonClick}>Cancel</button>
        <button type="submit" className="btn create-table-submit-btn">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateTableForm;
