import React, { Component } from 'react'

class NameForm extends Component {
    componentDidMount() {
        this.setState({
            isValidToSubmit: this._isValidVal(this.state.inputVal)
        });
    }
    state = {
        inputVal: "some value to input here",
        isValidToSubmit: false
    }

    _isValidVal = (val) => {
        return val && val.length > 3;
    }

    updateVal = (evt) => {
        // alert(this.input.value); // uncontrolled form
        let isValidToSubmit = false;
        if (this._isValidVal(evt.target.value)) {
            isValidToSubmit = true;
        }
        this.setState({
            inputVal: evt.target.value,
            isValidToSubmit: isValidToSubmit
        }, () => alert(`this.state.inputVal: ${this.state.inputVal}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `))
    }

    submit = (evt) => {
        alert(`Submitting: this.state.inputVal: ${this.state.inputVal}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `);
        if (!this.state.isValidToSubmit) {
            evt.preventDefault();
        }
    }

    render() {
        const { inputVal, isValidToSubmit } = this.state;

        return (
            <div>
            <form onSubmit={this.submit}>
                <input
                    type="text"
                    // ref={el => this.input = el}
                    onChange={this.updateVal}
                    value={inputVal}
                    style={{width: "200px"}}
                />
                <br/>
                {isValidToSubmit ?
                    <input
                        type="submit"
                        value="Submit"
                    />
                    :
                    <span style={{color: 'red'}}>
                        Invalid input to submit, need to be over 3 chars.
                    </span>
                }
            </form>
        </div>
        )
    }
}

export default NameForm
