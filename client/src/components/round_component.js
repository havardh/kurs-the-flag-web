import React from "react";
import {connect} from "react-redux";

import {COLORS} from "../constants/colors";

class ScoreBoard extends React.Component {
  render() {
    return (
      <div>
        <h2>Score</h2>
        <div>Clock: <span>3:20</span></div>
        <div>Team A: <span>100</span></div>
        <div>Team B: <span>200</span></div>
      </div>
    );
  }
}

class PlayerState extends React.Component {

  render() {
    return (
      <div style={{float: "left", margin: 20 + "px"}}>
        <h3>{this.props.name}</h3>
        <div>Color: <span>{COLORS[this.props.color]}</span></div>
      </div>
      );
  }
}

PlayerState.defaultProps = {
  name: "Unnamed Player"
};

class GameState extends React.Component {
  render() {
    const players = _.get(this.props, "players");
    return (
      <div>
        {_.map(players, ({name, color}, i) => (
          <PlayerState
            key={i}
            name={name}
            color={color}
          />
        ))}
      </div>
    );
  }
}

const Round = connect(
  ({players}) => ({players})
)((props) => (
  <div>
    <ScoreBoard />
    <GameState players={props.players} />
  </div>
));

export default Round;
