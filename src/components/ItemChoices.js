import React from 'react';

const ItemChoices = (props) => {
    if(props.itemData === null) {
        return null
    }

    function handleClick(event){
        props.onClick(event.target.value);
    }

    const items = props.itemData.map((item, index) => {
        if(item.location === props.currentLocation && item.visible === "TRUE") {
            return (
                <button className = "itemButton" key={index} value={item.stateTitle} onClick={handleClick}>-{item.screenDescription}</button>
            )
        }
        return "";
    })

    return (
        <div className='interaction-main'>
            You can see: {items}
        </div>
    )
}

export default ItemChoices;