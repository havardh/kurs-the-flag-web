/* eslint-env mocha */
import deepFreeze from 'deep-freeze';

import { setName, setColor } from '../../src/actions/round_action_creator';
import { players } from '../../src/reducers/round_reducer';

describe('Round reducer', () => {
  describe('Player reducer', () => {
    let defaultState;
    beforeEach(() => {
      defaultState = deepFreeze(players());
    });

    it('should default to a list of four players', () => {
      expect(defaultState.length).to.equal(4);
    });

    it('should set name of player', () => {
      const state = players(defaultState, setName(0, 'Player Name'));

      expect(state[0].name).to.equal('Player Name');
    });

    it('should set color of player', () => {
      const state = players(defaultState, setColor(2, 'RED'));

      expect(state[2].color).to.equal('RED');
    });
  });
});
