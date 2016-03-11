import _ from 'lodash';
import React from 'react';

import Round from '../components/round_component';
import Players from '../components/player_component';

export default React.createClass({

  getInitialState() {
    return {};
  },

  onBlur({target}) {
    this.setState({playerId: target.value});
  },

  render() {
    const {playerId} = this.state;

    return (
      <div>
        <p>
          <label>
            <input onBlur={this.onBlur}></input>
          </label>
        </p>

        <Round roundId={`simulate/${playerId}`}/>
        <Players roundId={`simulate/${playerId}`} />
      </div>
    );
  }

});
