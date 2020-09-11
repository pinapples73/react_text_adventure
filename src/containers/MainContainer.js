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
import {checkForValidMovement, processStandardVerbNounCommand} from "../functional/interactions";


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
            outputText: "",
            inventory: []
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
        let verbData = parserVerb(newCommand, this.state.commandData);

        let returnedData = [];

        if(verbData != null){
            switch (verbData.type){
                case "movement":
                    returnedData = checkForValidMovement(this.state.currentLocation, verbData.actualNoun, this.state.exitData);
                    this.setState({outputText: returnedData[1]});
                    if(this.state.currentLocation !== returnedData[0]){
                        this.setState({currentLocation: returnedData[0]})
                    }
                    break;
                case "single":
                    console.log("This is a single - no noun needed - command");
                    break;
                case "standard":
                    const nounDataS = parserNoun(newCommand, this.state.itemData);
                    if(nounDataS.length !== 0){
                        // console.log("Standard Command")
                        returnedData = processStandardVerbNounCommand(verbData.actualNoun, nounDataS, this.state.currentLocation, this.state.itemData)
                    } else {
                        returnedData.push(`You cannot ${verbData.actualNoun} that.`);
                    }
                    this.setState({outputText: returnedData[0]})
                    if(returnedData.length > 1){
                        for(let index = 0; index < this.state.itemData.length; index++) {
                            if (returnedData[1] === "get") {
                                if (nounDataS[0].id === this.state.itemData[index].id) {
                                    let itemDataCopy = Object.assign({}, this.state.itemData);
                                    itemDataCopy[index].location = 9999;
                                }
                            } else if (returnedData[1] === "drop") {
                                if (nounDataS[0].id === this.state.itemData[index].id) {
                                    let itemDataCopy = Object.assign({}, this.state.itemData);
                                    itemDataCopy[index].location = this.state.currentLocation;
                                }
                            }
                        }
                    }
                    break;
                case "complex":
                    const nounDataC = parserNoun(newCommand, this.state.itemData);
                    if(nounDataC.length !== 0){
                        console.log("Complex Command")
                    }
                    break;
                default:
                    break;
            }
        } else {
            this.setState({outputText: "You can't do that you dafty!"});
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