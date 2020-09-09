import React from "react";

const Locations = (props) => {

    if(props.locationData === null) {
        return null
    }

    let locationTitle = props.locationData[props.currentLocation - 1].title.toUpperCase();
    let locationDescription = props.locationData[props.currentLocation - 1].description;


    return (
        <div className="main">
            <h3 className = "location-title">{ locationTitle }</h3>
            <img className = "location-image" src = { require(`../assets/images/location${props.currentLocation}.png`) } alt="location"/>
            <p className = "location-description">{ locationDescription }</p>
        </div>

    )
}

export default Locations;