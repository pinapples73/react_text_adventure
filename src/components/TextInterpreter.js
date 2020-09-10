import React, { Component } from 'react';


class TextInterpreter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event){
        this.setState({text:event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const text = this.state.text.trim();
        if(!text){
            return
        }

        const commandPassed = this.state.text + "$$"

        this.props.onEnter(commandPassed);

        this.setState({text: "" })
    }


    render() {
        return (
            <div className='input-field'>
                <form onSubmit={this.handleSubmit}>
                        <label> What next? </label>
                        <input className="text-input" type="text" placeholder="enter your command..." value={this.state.text} onChange={this.handleTextChange}/>
                </form>
            </div>
        );
    }

};

export default TextInterpreter;