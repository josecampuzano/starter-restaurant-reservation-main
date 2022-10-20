import React, { useState } from "react"
import CreateReservationForm from "../components/CreateReservationForm"

function CreateReservationPage(){
    
    // defines the initial values for the Create Reservation Form
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1
    }

    // defines useState variable for Create Reservation Form Data
    const [newResFormData, setNewResFormData] = useState({...initialFormState})

    // handles a change in the form and stores those values within newResFormData useState variable
    const handleFormChange = ({target}) => {
        setNewResFormData({
            ...newResFormData,
            [target.name]: target.value
        })
    }

    // handles submission of form 
    // does this need to go to the database? 
    // can we export the information once we have it submitted?

    // returns form component with props passed down as default values
    return (
        <React.Fragment>
            <h1>Create Reservation</h1>
            <CreateReservationForm 
            handleFormChange={handleFormChange}
            first_name={newResFormData.first_name}
            last_name={newResFormData.last_name}
            mobile_number={newResFormData.mobile_number}
            reservation_date={newResFormData.reservation_date}
            reservation_time={newResFormData.reservation_time}
            people={newResFormData.people}
            />            
        </React.Fragment>
    )

}

export default CreateReservationPage