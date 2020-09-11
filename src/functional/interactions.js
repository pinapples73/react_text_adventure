//this function takes a recognised movement verb and checks if movement can be carried out
export function checkForValidMovement(currentLocation, verb, exitData){

    const direction = verb;
    let returnData = [];

    for(let index = 0; index < exitData.length; index++ ){
        let exitLocation = exitData[index].location;
        let exitStatus = exitData[index].status;
        let exitDirection = exitData[index].direction;

        if (exitLocation === currentLocation && exitDirection === direction) {
            if (exitStatus === "unblocked") {
                returnData.push(exitData[index].leadsTo);
                returnData.push(`You travel ${direction}.`);
            } else {
                returnData.push(currentLocation);
                returnData.push(exitData[index].blockedText);
            }
        }
    }

    if(returnData.length === 0) {
        returnData.push(currentLocation);
        returnData.push(`You cannot move ${direction} from here.`);
    }

    return returnData;
}

//this function process commands which have a standard verb and noun(s) command
export function processStandardVerbNounCommand(verb, nounData, currentLocation, itemData){

    let returnData = [];

    switch (verb){
        case "examine":
            if(currentLocation === nounData[0].location || nounData[0].location === 9999){
                returnData.push(`You examine the ${nounData[0].typedNoun}. ` + nounData[0].examineDescription);
            }
            break;
        case "get":
            if(currentLocation === nounData[0].location && nounData[0].type === "inventory"){
                returnData.push(`You pick up ${nounData[0].screenDescription}.`);
                returnData.push(verb);
            } else {
                returnData.push(`You cannot pick up ${nounData[0].screenDescription}.`);
            }
            break;
        case "drop":
            if(nounData[0].location === 9999){
                returnData.push(`You drop ${nounData[0].screenDescription}.`);
                returnData.push(verb)
            }
            break;
        default:
            console.log('This is not required.');
    }

    return returnData;
}