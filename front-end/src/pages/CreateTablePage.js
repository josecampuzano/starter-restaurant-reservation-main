import React, { useState } from "react";
import CreateTableForm from "../components/CreateTableForm";
import { addTable } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import TablesListBanner from "../assets/TablesListBanner.png"

function CreateTablePage() {
  const history = useHistory()
  const [newTableError, setNewTableError] = useState(null)
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [newTableFormData, setNewTableFormData] = useState({...initialFormState})

  const handleFormChange = ({ target }) => {
    setNewTableFormData({
        ...newTableFormData,
        [target.name]: target.value
    })
  }

  const newTableSubmitHandler = (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    setNewTableError(null)
    const formDataFormatted = {
        ...newTableFormData, 
        capacity: Number(newTableFormData.capacity)
    }
    addTable(formDataFormatted, abortController.signal)
        .then(() => {
            history.push("/dashboard")
        })
        .catch(setNewTableError)
        return () => abortController.abort()
}




  return (
    <React.Fragment>
      <br></br>
      <img
      className="img-fluid mx-auto d-block"
      src={TablesListBanner}
      alt={"Tables Banner with a table"}
      >
      </img>
      <br></br>
      <h1>Create Table</h1>
      <CreateTableForm 
        handleFormChange={handleFormChange}
        table_name={newTableFormData.table_name}
        capacity={newTableFormData.capacity}
        newTableSubmitHandler={newTableSubmitHandler}
      />
      <br></br>
      <ErrorAlert error={newTableError}/>
    </React.Fragment>
  );
}

export default CreateTablePage;
