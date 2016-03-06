import _ from "lodash";
import React from "react";

import {COLORS} from "../constants/colors";
import * as PlayerActionCreator from "../actions/player_action_creator";

const ColorButton = ({type, name, onClick}) => (
  <button onClick={() => onClick(type)}>
    {name}
  </button>
  );

export default class Player extends React.Component {

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
    this.setState(_.get(this.props.store.getState(), "players"));
  }

  setName(event) {
    PlayerActionCreator.setName(
      this.props.id,
      event.target.value
    )(this.props.store.dispatch);
  }

  setColor(color) {
    PlayerActionCreator.setColor(
      this.props.id,
      color
    )(this.props.store.dispatch);
  }

  render() {
    const {id} = this.props;

    const player = _.get(this.state, id) || {};

    return (
      <div style={{float: "left", margin: 20 + "px"}}>
        <h2>Player {this.props.id}</h2>

        <input
          value={player.name}
          onChange={this.setName.bind(this)}
        />
        <br />
        <div>
          {_.map(COLORS, (name, type) => (
            <ColorButton
              key={type}
              type={type}
              name={name}
              onClick={this.setColor.bind(this)} />)
          )}
        </div>
      </div>
    );
  }
}
