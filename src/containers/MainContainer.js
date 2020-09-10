import React, { Component } from 'react';

import dataLocation from '../assets/jsonFiles/locations.json';
import dataExists from "../assets/jsonFiles/exits.json";
import dataItems from "../assets/jsonFiles/items.json";
import dataCommands from "../assets/jsonFiles/commands.json";
import dataInteractions from "../assets/jsonFiles/interactions.json";

import Locations from "../components/Locations";
import ExitChoices from "../components/ExitChoices";
import ItemChoices from "../components/ItemChoices";
import TextInterpreter from "../components/TextInterpreter";
import OutputField from "../components/OutputField";

import { parserNoun, parserVerb } from "../functional/parser";
import {checkForValidMovement} from "../functional/interactions";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true,
            locationData: null,
            exitData: null,
            itemData: null,
            commandData: null,
            interactionData: null,
            currentLocation: 1,
            currentCommand: "",
            outputText: ""
        }
        this.handleInteraction = this.handleInteraction.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.setState({locationData: dataLocation});
        this.setState({exitData: dataExists});
        this.setState({itemData: dataItems});
        this.setState({commandData: dataCommands});
        this.setState({interactionData: dataInteractions});
    }

    handleInteraction(newCommand){
        this.setState({ currentCommand: newCommand });
        let verbData = parserVerb(newCommand, this.state.commandData);
        let movementData = [];

        if(verbData.type === "movement"){
            movementData = checkForValidMovement(this.state.currentLocation, verbData.actualNoun, this.state.exitData);
            this.setState({outputText: movementData[1]});
            console.log("new locaiton: ", movementData[0])
            if(this.state.currentLocation !== movementData[0]){
                this.setState({currentLocation: movementData[0]})
            }

        } else if(verbData.type === "single"){
            console.log("This is a single - no noun needed - command");
        } else {
            let nounData = parserNoun(newCommand, this.state.itemData)
            console.log("noun data returned is: ", nounData)
        }
    }


    render() {
        return (
            <div className='main'>
                <div className='text-field'>
                    <Locations locationData = {this.state.locationData} currentLocation = {this.state.currentLocation}/>
                    <ExitChoices exitData = {this.state.exitData} currentLocation = {this.state.currentLocation}/>
                    <ItemChoices itemData = {this.state.itemData} currentLocation = {this.state.currentLocation}/>
                </div>
                <div className="interactive-area">
                    <OutputField displayText = {this.state.outputText} />
                    <TextInterpreter lastCommand = {this.state.currentCommand} onEnter = {this.handleInteraction}/>
                </div>
            </div>
        )
    }


}
export default MainContainer;