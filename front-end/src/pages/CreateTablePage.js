import React, { useState } from "react";
import CreateTableForm from "../components/CreateTableForm";
import { addTable } from "../utils/api";
import { useHistory } from "react-router";

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
    addTable(formDataFormatted)
        .then(() => {
            history.push("/dashboard")
        })
        .catch(setNewTableError)
        return () => abortController.abort()
}




  return (
    <React.Fragment>
      <h1>Create Table</h1>
      <CreateTableForm 
        handleFormChange={handleFormChange}
        table_name={newTableFormData.table_name}
        capacity={newTableFormData.capacity}
        newTableSubmitHandler={newTableSubmitHandler}
      />
    </React.Fragment>
  );
}

export default CreateTablePage;
