//This function takes the command and checks for a verb
export function parserVerb(command, commandData){
    let verbData = null;

    for(let index =0; index < commandData.length; index++){
        let recognisedVerb = commandData[index].typedNoun;

        let result = command.search(recognisedVerb);

        if(result !== -1){
            console.log("found: ", recognisedVerb, " in  ", command, result);
            verbData = commandData[index];
        } else if(recognisedVerb === command) {
            console.log("found: ", recognisedVerb, " is equal to  ", command);
            verbData = commandData[index];
        }

    }

    return verbData;

}


//This function takes the command and checks for a noun
export function parserNoun(command, itemData){
    let nounData = [];

    for(let index = 0; index < itemData.length; index++){
        let recognisedNoun = itemData[index].typedNoun;

        let result = command.search(recognisedNoun);

        if(result !== -1){
            console.log("found ", recognisedNoun, " in ", command);
            if(itemData[index].visible === "TRUE"){
                nounData.push(itemData[index]);
            }
        }
    }

    return nounData;

}