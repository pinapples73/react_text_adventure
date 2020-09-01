import React from "react";

const Locations = (props) => {

    if(props.exitData === null) {
        return null
    }

    let locationTitle = props.locationData[props.currentLocation - 1].title.toUpperCase();
    let locationDescription = props.locationData[props.currentLocation - 1].description;

    //loop over the array of exists
    //if the exit location is equal to the current location
    //add it to an array of exits

    let exits = [];
    for(let exit of props.exitData){
        if(exit.location === props.currentLocation){
            exits.push(exit.screenDescription);
        }
    }
    console.log("Exits returned for this location: ", exits.length);

    let exitString = sentenceConstructor("To the ", exits)

    //this function takes in a base string and an array of strings
    //it loops over each string in array and checks if its the last one
    //if so it adds 'and' instead of ', ' between the list of strings
    function sentenceConstructor(baseString, baseArray){

        baseArray.forEach((singleString, index) => {
            baseString = baseString.concat(singleString);

            if(index === baseArray.length - 2){
                baseString = baseString.concat(" and ");
            }
            else if(index < baseArray.length -2){
                baseString = baseString.concat(", ");
            }
        })
        baseString = baseString + ". ";
        return baseString;
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