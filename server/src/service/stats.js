/* eslint-disable no-use-before-define */
import _ from 'lodash';
import * as POSITIONS from '../constants/positions';

export function getScore(ticks) {
  return _(ticks)
    .map(exports.calculateScore)
    .reduce(combineScore, { team1: 0, team2: 0 });
}

export function calculateScore(roundDetails) {
  if (team1IsOnBase2(roundDetails)
      && !team1IsOnBase1(roundDetails)
      && !team2IsOnBase2(roundDetails)
      && !team2IsOnBase1(roundDetails)) {
    return { team1: 1, team2: 0 };
  }

  if (team2IsOnBase1(roundDetails)
      && !team1IsOnBase1(roundDetails)
      && !team2IsOnBase2(roundDetails)
      && !team1IsOnBase2(roundDetails)) {
    return { team1: 0, team2: 1 };
  }

  return { team1: 0, team2: 0 };
}

function combineScore(left, right) {
  return {
    team1: left.team1 + right.team1,
    team2: left.team2 + right.team2,
  };
}

function team1IsOnBase2(round) {
  const [p1, p2] = round;

  return p1 === POSITIONS.TEAM_2.BASE || p2 === POSITIONS.TEAM_2.BASE;
}

function team1IsOnBase1(round) {
  const [p1, p2] = round;

  return p1 === POSITIONS.TEAM_1.BASE || p2 === POSITIONS.TEAM_1.BASE;
}

function team2IsOnBase1(round) {
  const [p1, p2, p3, p4] = round; // eslint-disable-line no-unused-vars

  return p3 === POSITIONS.TEAM_1.BASE || p4 === POSITIONS.TEAM_1.BASE;
}

function team2IsOnBase2(round) {
  const [p1, p2, p3, p4] = round; // eslint-disable-line no-unused-vars

  return p3 === POSITIONS.TEAM_2.BASE || p4 === POSITIONS.TEAM_2.BASE;
}
