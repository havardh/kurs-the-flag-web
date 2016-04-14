/* eslint-env mocha */
import { expect } from 'chai';

import * as StatsService from '../../src/service/stats';

import * as POSITIONS from '../../src/constants/positions';

const BASE_1 = POSITIONS.TEAM_1.BASE;
const BASE_2 = POSITIONS.TEAM_2.BASE;
const LEFT_1 = POSITIONS.TEAM_1.LEFT;
const LEFT_2 = POSITIONS.TEAM_2.LEFT;
const RIGHT_1 = POSITIONS.TEAM_1.RIGHT;
const RIGHT_2 = POSITIONS.TEAM_2.RIGHT;

describe('StatsService', () => {

  describe(".getScore", () => {
    let calculateScore;
    beforeEach(() => {
      calculateScore = sinon.stub(StatsService, "calculateScore");
      calculateScore.returns({ team1: 0, team2: 0});
    });

    it("should call calculateScore for each tick", () => {
      StatsService.getScore([
        [LEFT_1, LEFT_1, LEFT_2, LEFT_2],
        [RIGHT_1, LEFT_1, LEFT_2, LEFT_2],
        [RIGHT_1, RIGHT_1, RIGHT_2, LEFT_2],
        [RIGHT_1, RIGHT_1, RIGHT_2, RIGHT_2],
      ]);

      expect(calculateScore).to.have.been.calledWith([LEFT_1, LEFT_1, LEFT_2, LEFT_2]);
      expect(calculateScore).to.have.been.calledWith([RIGHT_1, LEFT_1, LEFT_2, LEFT_2]);
      expect(calculateScore).to.have.been.calledWith([RIGHT_1, RIGHT_1, RIGHT_2, LEFT_2]);
      expect(calculateScore).to.have.been.calledWith([RIGHT_1, RIGHT_1, RIGHT_2, RIGHT_2]);
    });

    it("should sum scores returned by calculateScore", () => {
      calculateScore
        .onCall(0).returns({ team1: 0, team2: 1 })
        .onCall(1).returns({ team1: 1, team2: 0 })
        .onCall(2).returns({ team1: 0, team2: 0 })
        .onCall(3).returns({ team1: 0, team2: 1 });

      const score = StatsService.getScore([[], [], [], []]);

      expect(score).to.deep.equal({
        team1: 1,
        team2: 2
      })
    })
  });

  describe(".calculateScore", () => {
    function expectScore(positions, expected) {
      expect(StatsService.calculateScore(positions))
        .to.deep.equal(expected);
    }

    describe('team 1', () => {
      it('should reveive 1 point when attacking', () => {
        expectScore(
          [BASE_2, LEFT_1, LEFT_2, LEFT_2],
          { team1: 1, team2: 0 }
        );

        expectScore(
          [LEFT_1, BASE_2, LEFT_2, LEFT_2],
          { team1: 1, team2: 0 }
        );
      });

      it('should not reveive points when attacking and defending', () => {
        expectScore(
          [BASE_2, BASE_1, LEFT_1, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [BASE_1, BASE_2, LEFT_1, LEFT_1],
          { team1: 0, team2: 0 }
        );
      });

      it('should not reveive points when attacking and team 2 defending', () => {
        expectScore(
          [BASE_2, LEFT_1, BASE_2, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [BASE_2, LEFT_1, LEFT_2, BASE_2],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_2, BASE_2, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_2, LEFT_2, BASE_2],
          { team1: 0, team2: 0 }
        );
      });
    });

    describe('team 2', () => {
      it('should reveive 1 point when attacking', () => {
        expectScore(
          [LEFT_2, LEFT_1, BASE_1, LEFT_2],
          { team1: 0, team2: 1 }
        );

        expectScore(
          [LEFT_1, LEFT_1, LEFT_2, BASE_1],
          { team1: 0, team2: 1 }
        );
      });

      it('should not reveive points when attacking and defending', () => {
        expectScore(
          [LEFT_2, LEFT_1, BASE_1, BASE_2],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_1, LEFT_2, BASE_2, BASE_1],
          { team1: 0, team2: 0 }
        );
      });

      it('should not reveive points when attacking and team 1 defending', () => {
        expectScore(
          [BASE_1, LEFT_1, BASE_1, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [BASE_1, LEFT_1, LEFT_2, BASE_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_1, BASE_1, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_1, LEFT_2, BASE_1],
          { team1: 0, team2: 0 }
        );
      });
    });
    describe('when both teams are attaching', () => {
      it('should not give any points', () => {
        expectScore(
          [BASE_2, LEFT_1, BASE_1, LEFT_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [BASE_2, LEFT_1, LEFT_2, BASE_1],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_2, BASE_1, LEFT_2],
          { team1: 0, team2: 0 }
        );

        expectScore(
          [LEFT_2, BASE_2, LEFT_2, BASE_2],
          { team1: 0, team2: 0 }
        );
      });
    });
  });
});
