import _ from 'lodash';
import React, { PropTypes } from 'react';
import leftpad from 'left-pad';

import * as COLORS from '../../../common/src/constants/color';

function formatTicks(ticks) {
  if (!ticks) {
    return '0:0';
  }

  const minutes = parseInt(ticks / 60, 10);
  const seconds = ticks - minutes * 60;

  return `${leftpad(minutes, 2, 0)}:${leftpad(seconds, 2, 0)}`;
}

const ScoreBoard = ({ className, team1, team2, ticks }) => (
  <div className={className}>
    <h2>Score</h2>
    <div>Clock: <span>{formatTicks(ticks)}</span></div>
    <div>Team A: <span>{team1}</span></div>
    <div>Team B: <span>{team2}</span></div>
  </div>
);

ScoreBoard.propTypes = {
  className: PropTypes.string,
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

  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);
    this.state = { started: false };
  }

  componentDidMount() {
    if (this.props.roundId !== 'simulate/undefined') {
      if (this.state.started) {
        this.props.fetchStatus(this.props.roundId);
        this.addSetTimeout(true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roundId !== this.props.roundId) {
      if (nextProps.roundId !== 'simulate/undefined') {
        if (this.state.started) {
          this.props.fetchStatus(nextProps.roundId);
          if (!this.timeout) {
            this.addSetTimeout(true);
          }
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return _.isEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  onStart() {
    this.setState({ started: true });
    this.props.start(this.props.roundId);
    this.addSetTimeout(true);
  }

  addSetTimeout(force = false) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (!force && this.props.round.ticks <= 0) {
      return;
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
        <div className="flex">
          <ScoreBoard className="flex--2" {...round.stats} ticks={round.ticks} />
          <button
            className="flex--1"
            onClick={this.onStart}
            disabled={round.ticks > 0 && round.ticks !== 100}
            style={{ background: '#66CD00', fontSize: '2em' }}
          >
            Start
          </button>
        </div>
        <GameState {...round} />
      </div>
    );
  }
}

Round.propTypes = {
  roundId: PropTypes.string.isRequired,
  round: PropTypes.object,
  fetchStatus: PropTypes.func,
  start: PropTypes.func,
};
