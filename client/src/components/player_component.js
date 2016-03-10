import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { COLORS } from '../constants/colors';
import { setName, setColor } from '../actions/player_action_creator';

const roundId = 0;

const ColorButton = ({ color, onClick }) => (
  <button onClick={() => onClick(color.type)}>
    {color.name}
  </button>
);

ColorButton.propTypes = {
  color: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

const Player = ({ id, player, onChange, onClick }) => (
  <div style={{ float: 'left', margin: '20px' }}>
    <h2>Player {id}</h2>
    <input
      value={player.name}
      onChange={onChange}
    />
    <br />
    <div>
      {_.map(COLORS, (name, type) => (
        <ColorButton
          key={type}
          color={{ type, name }}
          onClick={onClick}
        />)
      )}
    </div>
  </div>
);

Player.propTypes = {
  id: React.PropTypes.number,
  player: React.PropTypes.object,
  onSetName: React.PropTypes.func,
  onSetColor: React.PropTypes.func,
};

const Players = ({ players, setName, setColor }) => (
  <div style={{ clear: 'both' }}>
    {_.map(players, (player, id) => (
      <Player
        key={id}
        player={player}
        id={id}
        onChange={({ target }) => setName(id, target.value)}
        onClick={color => setColor(roundId, id, color)}
      />
    )
    )}
  </div>
);

Players.propTypes = {
  players: React.PropTypes.array,
  onSetName: React.PropTypes.func,
  onSetColor: React.PropTypes.func,
};

export default connect(
  ({ players }) => ({ players }),
  { setName, setColor }
)(Players);
