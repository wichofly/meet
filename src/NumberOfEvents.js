import React, { Component } from 'react';

import { ErrorAlert } from './Alert'

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
    errorText: ''
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    
    if (value < 1 || value > 32) {
      this.setState({
        numOfEvents: value,
        errorText: 'Please enter a number between 1 and 32'
      });
    } else {
      this.props.updateEvents(undefined, value);
      this.setState({ numOfEvents: value, errorText: '' });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label>
          Number of Events:
          <input
            type="number"
            className="number-input"
            value={this.state.numOfEvents}
            onChange={this.handleInputChanged}
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;