import React from 'react';

const ExitChoices = (props) => {
    if(props.exitData === null) {
        return null
    }


    function handleClick(event){
        props.onClick(event.target.value);
    }


    const exits = props.exitData.map((exit, index) => {
        if(exit.location === props.currentLocation && exit.status === "unblocked") {
            return (
                <button className = "exitButton" key={index} value={exit.leadsTo} onClick={handleClick}>-{exit.direction}</button>
            )
        }
        return "";
    })


    return (
        <div className='interaction-main'>
            <p>Exits lead: {exits}</p>
        </div>
    )

}
export default ExitChoices;