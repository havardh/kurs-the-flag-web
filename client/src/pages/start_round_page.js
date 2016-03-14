import React from 'react';
import { browserHistory } from 'react-router';


class StartRoundPage extends React.Component {

  onClick() {
    browserHistory.push('/rounds/0');
  }

  render() {
    return (
      <div>
        <h2>Start Round</h2>
        <p>
          <label>Player 1</label>
          <input></input>
        </p>
        <input></input>
        <input></input>
        <input></input>
        <button onClick={this.onClick}>Start</button>
      </div>
    );
  }

}

export default StartRoundPage;
