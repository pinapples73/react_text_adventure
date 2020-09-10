import React from 'react';

const OutputField = (props) => {

    if(props.displayText === null){
        return null;
    }

    let output = props.displayText;

    return(
        <div className = 'output-text'>
            {output}
        </div>
    )

}

export default OutputField;