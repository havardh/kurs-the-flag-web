/* eslint-disable react/jsx-no-bind */
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

const PlayerSelect = ({ name, players, onChange }) => (
  <select
    name={name}
    style={{ marginLeft: '1rem' }}
    onChange={({ target }) => onChange(target.name, target.value)}
  >
    <option />
    {_.map(players, player =>
      <option key={player.ip} value={player.ip}>{player.name}</option>
    )}
  </select>
);

PlayerSelect.propTypes = {
  name: PropTypes.string,
  players: PropTypes.array,
  onChange: PropTypes.func,
};

const TeamChoice = ({ name, slug, data, players, onChange }) => (
  <div>
    <h3>Team {name}</h3>
    <label className="flex">
      Player 1
      <PlayerSelect
        name={`team.${slug}.player1`}
        value={_.get(data, `team.${slug}.player1`)}
        players={players}
        onChange={onChange}
      />
    </label>

    <label>
      Player 2
      <PlayerSelect
        name={`team.${slug}.player2`}
        value={_.get(data, `team.${slug}.player2`)}
        players={players}
        onChange={onChange}
      />
    </label>
  </div>
);

TeamChoice.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  slug: PropTypes.string,
  players: PropTypes.array,
  onChange: PropTypes.func,
};

export default class StartRoundForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  onChange(name, value) {
    this.setState({ [name]: value });
  }

  onStart() {
    this.props.onStart([
      _.get(this.state, 'team.a.player1'),
      _.get(this.state, 'team.a.player2'),
      _.get(this.state, 'team.b.player1'),
      _.get(this.state, 'team.b.player2'),
    ]);
  }

  render() {
    return (
      <div>
        <h2>Start round</h2>
        <TeamChoice
          name="A"
          slug="a"
          data={this.state}
          players={this.props.players}
          onChange={this.onChange}
        />

        <TeamChoice
          name="B"
          slug="b"
          data={this.state}
          players={this.props.players}
          onChange={this.onChange}
        />

        <button onClick={this.onStart}>Start</button>
      </div>
    );
  }
}

StartRoundForm.propTypes = {
  players: PropTypes.array,
  onStart: PropTypes.func.isRequired,
};
