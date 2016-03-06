import _ from "lodash";
import React from "react";
import {connect} from "react-redux";

import {COLORS} from "../constants/colors";
import * as PlayerActionCreator from "../actions/player_action_creator";

const ColorButton = ({type, name, onClick}) => (
  <button onClick={() => onClick(type)}>
    {name}
  </button>
);

const Player = ({id, player, onSetName, onSetColor}) => (
  <div style={{float: "left", margin: 20 + "px"}}>
    <h2>Player {id}</h2>
    <input
      value={player.name}
      onChange={onSetName}
    />
    <br />
    <div>
      {_.map(COLORS, (name, type) => (
        <ColorButton
          key={type}
          type={type}
          name={name}
          onClick={() => onSetColor(type)} />)
      )}
    </div>
  </div>
);

const Players = ({players, setName, setColor}) => (
  <div style={{clear: "both"}}>
    {_.map(players, (player, id) => (
      <Player
        key={id}
        player={player}
        id={id}
        onSetName={({target}) => setName(id, target.value)}
      onSetColor={color => setColor(id, color)}/>
      )
    )}
  </div>
);

export default connect(
  ({players}) => ({players}),
  (dispatch) => ({
    setName: (id, name) => PlayerActionCreator.setName(id, name)(dispatch),
    setColor: (id, color) => PlayerActionCreator.setColor(id, color)(dispatch)
  })
)(Players);
