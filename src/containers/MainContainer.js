import React, { Component } from 'react';

import dataLocation from '../assets/jsonFiles/locations.json';
import dataExists from "../assets/jsonFiles/exits.json";

import Locations from "../components/Locations";
import ExitChoices from "../components/ExitChoices";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true,
            locationData: null,
            exitData: null,
            currentLocation: 1
        }
        this.handleExitChoice = this.handleExitChoice.bind(this);
        // this.loadData = this.loadData.bind(this); -- not required to bind this as not used in a callback function
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({locationData: dataLocation})
        this.setState({exitData: dataExists})
    }

    handleExitChoice(newLocation){
        newLocation = parseInt(newLocation);
        this.setState({currentLocation: newLocation})
    }


    render() {
        return (
            <div className='main'>
                <Locations locationData = {this.state.locationData} exitData = {this.state.exitData} currentLocation = {this.state.currentLocation}/>
                <ExitChoices exitData = {this.state.exitData} currentLocation = {this.state.currentLocation} onClick = {this.handleExitChoice}/>
            </div>
        )
    }


}
export default MainContainer;