import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import * as COLORS from '../../../common/src/constants/color';
import { setName, setColor } from '../actions/player_action_creator';

const ColorButton = ({ color, onClick }) => (
  <button onClick={() => onClick(color.type)}>
    {color.name}
  </button>
);

ColorButton.propTypes = {
  color: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export const Player = ({ player, onChange, onClick }) => (
  <div style={{ float: 'left', margin: '20px' }}>
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
  player: React.PropTypes.object,
  onSetName: React.PropTypes.func,
  onSetColor: React.PropTypes.func,
};

const Players = ({ players, setName, setColor, roundId }) => (
  <div style={{ clear: 'both' }}>
    {_.map(players, (player, id) => (
      <Player
        key={id}
        player={player}
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
