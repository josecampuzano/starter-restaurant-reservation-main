import React from "react";
import { readReservation, updateReservation } from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import CreateReservationForm from "../components/CreateReservationForm";


function ReservationEditPage(){

    const [reservationError, setReservationError] = useState(null)
    const params = useParams()
    const reservation_id = params.reservation_id
    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      };
    
      // defines useState variable for Create Reservation Form Data
      const [newResFormData, setNewResFormData] = useState({ ...initialFormState });

    useEffect(loadReservation, [reservation_id])

    function loadReservation () {
        const abortController = new AbortController()
        setReservationError(null)
        readReservation(reservation_id, abortController.signal)
            .then((response) => {
                setNewResFormData(response)
            })
            .catch(setReservationError)
        return () => abortController.abort()
    }

const cancelButtonClick = () => history.go(-1)

  // handles a change in the form and stores those values within newResFormData useState variable
  const handleFormChange = ({ target }) => {
    setNewResFormData({
      ...newResFormData,
      [target.name]: target.value,
    });
  };


  // handles the submission of the form
  // makes a call to the API with the /reservations endpoint with an POST method
  const newResSubmitHandler =  (event) => {
    event.preventDefault();
    const abortController = new AbortController()
    setReservationError(null)
    const formDataFormatted = {
      ...newResFormData,
      people: Number(newResFormData.people),
    };
    updateReservation(formDataFormatted, reservation_id, abortController.signal)
        .then(() => {
            history.push(`/dashboard?date=${newResFormData.reservation_date}`);
        })
        .catch(reservationError)
    return () => abortController.abort()
  };




    return (
        <React.Fragment>
            <CreateReservationForm 
            newResSubmitHandler={newResSubmitHandler}
            handleFormChange={handleFormChange}
            cancelButtonClick={cancelButtonClick}
            first_name={newResFormData.first_name}
            last_name={newResFormData.last_name}
            mobile_number={newResFormData.mobile_number}
            reservation_date={newResFormData.reservation_date}
            reservation_time={newResFormData.reservation_time}
            people={newResFormData.people}
            />
            <ErrorAlert error={reservationError}/>
        </React.Fragment>
    )
}

export default ReservationEditPage