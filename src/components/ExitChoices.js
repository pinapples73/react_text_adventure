import React from 'react';
import {sentenceConstructor} from "./utils";

const ExitChoices = (props) => {
    if(props.exitData === null) {
        return null
    }

    //loop over the array of exists
    //if the exit location is equal to the current location
    //add it to an array of exits
    let exits = [];
    for(let exit of props.exitData){
        if(exit.location === props.currentLocation){
            exits.push(exit.screenDescription);
        }
    }

    //organise the exits using the sentenceConstructor function adding ',' or 'and' where necessary
    let exitString = sentenceConstructor("To the ", exits)

    return (
        <div className='location-description'>
            {exitString}
        </div>
    )

}
export default ExitChoices;