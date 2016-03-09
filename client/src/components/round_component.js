import React from "react";
import {connect} from "react-redux";
import {fetchStatus} from "../actions/round_action_creator";

import {COLORS} from "../constants/colors";

const roundId = 0;

const ScoreBoard = (props) => (
  <div>
    <h2>Score</h2>
    <div>Clock: <span>3:20</span></div>
    <div>Team A: <span>100</span></div>
    <div>Team B: <span>200</span></div>
  </div>
);

const PlayerState = ({player}) => (
  <div style={{float: "left", margin: 20 + "px"}}>
    <h3>{player.name || "Unnamed Player"}</h3>
    <div>Color: <span>{COLORS[player.color]}</span></div>
  </div>
);

const GameState = (props) => (
  <div>
    {_.map(props.players, (player, i) => (
     <PlayerState
        key={i}
        player={player}
      />
    ))}
  </div>
);

class Round extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStatus(roundId);
  }

  render() {
    return (
      <div>
        <ScoreBoard />
        <GameState players={this.props.players} />
      </div>
    );
  }
}

export default connect(
  state => state,
  {fetchStatus}
)(Round);
