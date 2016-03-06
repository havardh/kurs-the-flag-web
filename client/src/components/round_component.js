import React from "react";
import {connect} from "react-redux";

import {COLORS} from "../constants/colors";

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

const Round = (props) => (
  <div>
    <ScoreBoard />
    <GameState players={props.players} />
  </div>
)

export default connect(state => state)(Round);
