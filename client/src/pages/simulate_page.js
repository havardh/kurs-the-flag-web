import React from 'react';
import { connect } from 'react-redux';

import { fetchStatus } from '../actions/round_action_creator';
import { Round } from '../components/round_component';
import Players from '../components/player_component';

export const SimulatePage = React.createClass({
  getInitialState() {
    return {};
  },

  onBlur({ target }) {
    this.setState({ playerId: target.value });
  },

  render() {
    const { playerId } = this.state;

    return (
      <div>
        <p>
          <label>
            <input onBlur={this.onBlur}></input>
          </label>
        </p>

        <Round {...this.props} roundId={`simulate/${playerId}`} />
        <Players roundId={`simulate/${playerId}`} />
      </div>
    );
  },
});

export default connect(
  ({ round }, { params }) => ({
    round,
    roundId: params.roundId,
  }),
  { fetchStatus }
)(SimulatePage);
