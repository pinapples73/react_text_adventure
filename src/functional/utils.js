//this function takes in a base string and an array of strings
//it loops over each string in array and checks if its the last one
//if so it adds 'and' instead of ', ' between the list of strings
export function sentenceConstructor(baseString, baseArray){

    baseArray.forEach((singleString, index) => {
        baseString = baseString.concat(singleString);

        if(index === baseArray.length - 2){
            baseString = baseString.concat(" and ");
        }
        else if(index < baseArray.length -2){
            baseString = baseString.concat(", ");
        }
    })
    baseString = baseString + ". ";
    return baseString;
}