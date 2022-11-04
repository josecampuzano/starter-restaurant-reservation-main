import React, { useState } from "react";
import CreateReservationForm from "../components/CreateReservationForm";
import { addReservation } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsListBanner from "../assets/ReservationsListBanner.png"

function CreateReservationPage() {
  const history = useHistory();
  const [newResError, setNewResError] = useState(null)

  // defines the initial values for the Create Reservation Form
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  // defines useState variable for Create Reservation Form Data
  const [newResFormData, setNewResFormData] = useState({ ...initialFormState });

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
    setNewResError(null)
    const formDataFormatted = {
      ...newResFormData,
      people: Number(newResFormData.people),
    };
    addReservation(formDataFormatted, abortController.signal)
        .then(() => {
            history.push(`/dashboard?date=${newResFormData.reservation_date}`);
        })
        .catch(setNewResError)
    return () => abortController.abort()
  };

  // returns form component with props passed down as default values
  return (
    <React.Fragment>
      <br></br>
      <ErrorAlert error={newResError}/>  
      <img
      className="img-fluid mx-auto d-block"
      src={ReservationsListBanner}
      alt={"Reservations Banner with a check mark"}
      >
      </img>
      <br></br>
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
      <br></br>

    </React.Fragment>
  );
}

export default CreateReservationPage;
