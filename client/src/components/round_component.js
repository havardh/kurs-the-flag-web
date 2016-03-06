import React from "react";

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

export default class Round extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.unsubscribe = this.props.store.subscribe(this.onStoreChange.bind(this));
  }

  componentDidMount() {
    this.onStoreChange();
  }

  componentDidUnmont() {
    this.unsubscribe();
  }

  onStoreChange() {
    this.setState(this.props.store.getState());
  }

  render() {
    return (
      <div>
        <ScoreBoard />
        <GameState players={_.get(this.state, "players")} />
      </div>

    );
  }
}
