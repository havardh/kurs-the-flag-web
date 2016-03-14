import React from 'react';
import { connect } from 'react-redux';

import { Player } from '../components/player_component';
import { setName, setColor } from '../actions/player_action_creator';

const RoundPlayerPage = React.createClass({

  onChange({ target }) {
    const { roundId, playerId } = this.props.params;
    this.props.setName(playerId, target.value);
  },

  onClick(color) {
    const { roundId, playerId } = this.props.params;
    this.props.setColor(roundId, playerId, color);
  },

  render() {
    const { roundId, playerId } = this.props.params;
    const player = _.get(this.props.players, playerId);

    return (
      <Player player={player} onChange={this.onChange} onClick={this.onClick} />
    );
  }
});

export default connect(
  ({ players }) => ({ players }),
  { setName, setColor }
)(RoundPlayerPage);
