import _ from 'lodash';
import React from 'react';

import * as COLORS from '../../../common/src/constants/color';

const ColorButton = ({ color, onClick }) => (
  <button onClick={() => onClick(color.type)}>
    {color.name}
  </button>
);

ColorButton.propTypes = {
  color: React.PropTypes.object,
  onClick: React.PropTypes.func,
};


function stop(callback) {
  return function (event) {
    event.stopPropagation();
    callback();
  };
}

function robotColor(color) {
  return typeof(color) === 'string' ? 'on-' + color.toLowerCase() : '';
}

export const Board = ({ color, onClick }) => (
  <div onClick={stop(() => onClick('BLACK'))} className="border black">

    <div onClick={stop(() => onClick('GREY'))} className="cell gray" />
    <div onClick={stop(() => onClick('YELLOW'))} className="cell yellow" />
    <div onClick={stop(() => onClick('WHITE'))} className="cell white" />
    <div onClick={stop(() => onClick('BLUE'))} className="cell blue" />

    <div onClick={stop(() => onClick('GREEN'))} className="target1 green" />
    <div onClick={stop(() => onClick('RED'))} className="target2 red" />

    <div className={`robot ${robotColor(color)}`} />
  </div>
);

Board.propTypes = {
  onClick: React.PropTypes.func,
  color: React.PropTypes.string,
};

export const Player = ({ player, onChange, onClick }) => (
  <div style={{ float: 'left', margin: '20px' }}>
    <input
      value={(player || {}).name}
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
    <Board color={(player || {}).color} onClick={onClick} />

  </div>
);

Player.propTypes = {
  player: React.PropTypes.object,
  onSetName: React.PropTypes.func,
  onSetColor: React.PropTypes.func,
};

export const Players = ({ players, setName, setColor, roundId }) => (
  <div style={{ clear: 'both' }}>
    {_.map(players, (player, id) => (
        <div>
        {id == 0 && <h3>Team A</h3>}
        {id == 2 && <h3>Team B</h3>}
        <Player
          key={id}
          player={player}
          onChange={({ target }) => setName(id, target.value)}
          onClick={color => { console.log(color); return setColor(roundId, id, color) }}
        />
      </div>
    )
    )}
  </div>
);

Players.propTypes = {
  players: React.PropTypes.array,
  onSetName: React.PropTypes.func,
  onSetColor: React.PropTypes.func,
};
