import _ from 'lodash';
import React, { PropTypes } from 'react';

import * as COLORS from '../../../common/src/constants/color';

const ScoreBoard = ({ team1, team2, ticks }) => (
  <div>
    <h2>Score</h2>
    <div>Clock: <span>{ticks}</span></div>
    <div>Team A: <span>{team1}</span></div>
    <div>Team B: <span>{team2}</span></div>
  </div>
);

ScoreBoard.propTypes = {
  team1: PropTypes.number,
  team2: PropTypes.number,
  ticks: PropTypes.number,
};

const PlayerState = ({ player }) => (
  <div style={{ float: 'left', margin: '20px' }}>
    <h3>{player.name || 'Unnamed Player'}</h3>
    <div>Color: <span>{COLORS[player.color]}</span></div>
  </div>
);

PlayerState.propTypes = {
  player: PropTypes.object,
};

const GameState = ({ players }) => (
  <div>
    {_.map(players, (player, i) => (
      <PlayerState
        key={i}
        player={player}
      />
    ))}
  </div>
);

GameState.propTypes = {
  players: PropTypes.array,
};

export class Round extends React.Component {

  componentDidMount() {
    if (this.props.roundId !== 'simulate/undefined') {
      this.props.fetchStatus(this.props.roundId);
      this.addSetTimeout();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roundId !== this.props.roundId) {
      this.props.fetchStatus(nextProps.roundId);
      this.addSetTimeout();
    }
  }

  shouldComponentUpdate(nextProps) {
    return _.isEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }


  addSetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.timeout = setTimeout(
      () => {
        this.props.fetchStatus(this.props.roundId);
        this.addSetTimeout();
      },
      500
    );
  }

  render() {
    const { round } = this.props;

    return (
      <div>
        <ScoreBoard {...round.stats} ticks={round.ticks} />
        <GameState {...round} />
      </div>
    );
  }
}

Round.propTypes = {
  roundId: PropTypes.string.isRequired,
  round: PropTypes.object,
  fetchStatus: PropTypes.func,
};
