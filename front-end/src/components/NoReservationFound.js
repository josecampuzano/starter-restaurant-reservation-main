import React from "react";
import notFoundImage from "../assets/NotFoundImage.png"

function NoReservationFound(){
    return (
        <React.Fragment>
            <div className="container-fluid">
            <img 
            src={notFoundImage}
            alt={"Guy searching with a magnifying glass"} 
            className="img-fluid mx-auto d-block">
            </img>
            <h1 className="text-center">No reservations found yet!</h1>
            <br></br>
            </div>

        </React.Fragment>
    )
}

export default NoReservationFound