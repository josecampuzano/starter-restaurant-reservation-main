import React from "react";
import { useState } from "react";
import SearchReservationForm from "../components/SearchReservationForm";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SearchReservationList from "../components/SearchReservationsList";
import NoReservationFound from "../components/NoReservationFound";



function SearchPage(){
    const [searchError, setSearchError] = useState(null)
    const [reservations, setReservations] = useState([])
    const initialFormState = {
        mobile_number: "",
    }
    const [searchFormData, setSearchFormData] = useState({...initialFormState})
    
    const handleFormChange = ({ target }) => {
        setSearchFormData({
            ...searchFormData,
            [target.name]: target.value,
        })
    }
    
    const searchFormSubmitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        setSearchError(null)
        const number = {
            mobile_number: searchFormData.mobile_number
        }
        listReservations(number, abortController.signal)
            .then(setReservations)
            .catch(setSearchError)
        return () => abortController.abort()
    }

    return (
        <React.Fragment>
            <SearchReservationForm 
            handleFormChange={handleFormChange}
            mobile_number={searchFormData.mobile_number}
            searchFormSubmitHandler={searchFormSubmitHandler}
            />
            {reservations.length === 0 ? <NoReservationFound /> : <SearchReservationList reservations={reservations} />}
            <ErrorAlert error={searchError}/>

        </React.Fragment>
    )
}

export default SearchPage