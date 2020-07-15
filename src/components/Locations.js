import React from "react";

const Locations = (props) => {

    if(props.exitData === null) {
        return null
    }

    let locationTitle = props.locationData[props.currentLocation - 1].title.toUpperCase();
    let locationDescription = props.locationData[props.currentLocation - 1].description;

    //loop (map) over the array of exists
    //if the exit location is equal to the current location
    //add it to an array of exits
    const exits = props.exitData.map((exit) => {
        let exitList = [];
        if(exit.location === props.currentLocation) {
            exitList.push(exit.screenDescription);
        }
        return exitList;
    })

    let exitString = stringManipulation("To the ", exits)

    //this function takes in a base string and an array of strings
    //it loops over each string in array and checks if its the last one
    //if so it adds 'and' instead of ', ' between the list of strings
    function stringManipulation(baseString, baseArray){
        const arrayLength = baseArray.length -1;
        let intermediateString = "";
        let endString = "";

        baseArray.forEach((singleString, index) => {
            if(index === arrayLength){
                baseString += " and ";
            } else if(index > 0){
                baseString += ", "
            }
            intermediateString = baseString.concat(singleString);
            baseString = intermediateString;

        })
        endString = intermediateString + ". ";
        return endString;
    }


    return (
        <div className="main">
            <p className = "location-title">{ locationTitle }</p>
            <img className = "location-image" src = { require(`../assets/images/location${props.currentLocation}.png`) } alt="location"/>
            <p className = "location-description">{ locationDescription } { exitString }</p>
        </div>

    )
}

export default Locations;