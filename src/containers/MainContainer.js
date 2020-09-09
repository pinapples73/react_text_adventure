import React, { Component } from 'react';

import dataLocation from '../assets/jsonFiles/locations.json';
import dataExists from "../assets/jsonFiles/exits.json";
import dataItems from "../assets/jsonFiles/items.json";

import Locations from "../components/Locations";
import ExitChoices from "../components/ExitChoices";
import ItemChoices from "../components/ItemChoices";
// import CommandChoices from "../components/";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true,
            locationData: null,
            exitData: null,
            itemData: null,
            currentLocation: 1
        }
        this.handleExitChoice = this.handleExitChoice.bind(this);
        this.handleItemInteraction = this.handleItemInteraction.bind(this);
        // this.loadData = this.loadData.bind(this); -- not required to bind this as not used in a callback function
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({locationData: dataLocation})
        this.setState({exitData: dataExists})
        this.setState({itemData: dataItems})
    }

    handleExitChoice(newLocation){
        newLocation = parseInt(newLocation);
        this.setState({currentLocation: newLocation})
    }

    handleItemInteraction(selectedItem){
        console.log(selectedItem)
    }


    render() {
        return (
            <div className='main'>
                <Locations locationData = {this.state.locationData} exitData = {this.state.exitData} currentLocation = {this.state.currentLocation}/>
                <ItemChoices itemData = {this.state.itemData} currentLocation = {this.state.currentLocation} onClick = {this.handleItemInteraction}/>
                <ExitChoices exitData = {this.state.exitData} currentLocation = {this.state.currentLocation} onClick = {this.handleExitChoice}/>
            </div>
        )
    }


}
export default MainContainer;