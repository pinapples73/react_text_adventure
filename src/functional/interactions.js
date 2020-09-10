//this function takes a recognised movement verb and checks if movement can be carried out
export function checkForValidMovement(currentLocation, verb, exitData){

    const direction = verb;
    let returnData = [];

    for(let index = 0; index < exitData.length; index++ ){
        let exitLocation = exitData[index].location;
        let exitStatus = exitData[index].status;
        let exitDirection = exitData[index].direction;

        if(exitLocation === currentLocation){
            if(exitDirection === direction){
                if(exitStatus === "unblocked"){
                    returnData.push(exitData[index].leadsTo);
                    returnData.push(`You travel ${direction}.`);
                } else {
                    returnData.push(currentLocation);
                    returnData.push(exitData[index].blockedText);
                }
            }
        }
    }

    if(returnData.length === 0) {
        returnData.push(currentLocation);
        returnData.push(`You cannot move ${direction} from here.`);
    }

    return returnData;
}
