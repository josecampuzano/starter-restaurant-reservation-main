import React, { useState } from "react"
import CreateReservationForm from "../components/CreateReservationForm"
import { addReservation } from "../utils/api"
import { useHistory } from "react-router"

function CreateReservationPage(){
    const history = useHistory()

    // defines the initial values for the Create Reservation Form
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
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

    const newResSubmitHandler = async (event) => {
        event.preventDefault()
        const formDataFormatted = {...newResFormData, people: Number(newResFormData.people)}
        await addReservation(formDataFormatted) 
        //TODO Add an abort controller to the addReservation parameters
        history.push(`/dashboard?date=${newResFormData.reservation_date}`)
    }


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
            newResSubmitHandler={newResSubmitHandler}
            />            
        </React.Fragment>
    )

}

export default CreateReservationPage