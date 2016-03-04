import React from "react";

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
        <div>Color: <span>Black</span></div>
      </div>
      );
  }
}

class GameState extends React.Component {
  render() {
    return (
      <div>
        <PlayerState name={"Player 1"} />
        <PlayerState name={"Player 2"} />
        <PlayerState name={"Player 3"} />
        <PlayerState name={"Player 4"} />
      </div>
    );
  }
}

export default class Round extends React.Component {
  render() {
    return (
      <div>
        <ScoreBoard />
        <GameState />
      </div>

    );
  }
}
