import React from 'react';
import {sentenceConstructor} from "./utils";

const ItemChoices = (props) => {
    if(props.itemData === null) {
        return null
    }

    let items = [];
    for(let item of props.itemData){
        if(item.location === props.currentLocation && item.visible === "TRUE"){
            items.push(item.screenDescription);
        }
    }

    //organise the items using the sentenceConstructor function adding ',' or 'and' where necessary
    let itemString = sentenceConstructor("You notice ", items)

    return (
        <div className='location-description'>
            <p>{itemString}</p>
        </div>
    )
}

export default ItemChoices;