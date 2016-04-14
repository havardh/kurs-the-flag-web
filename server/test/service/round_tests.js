/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import PlayerService from '../../src/service/player';
import { RoundService } from '../../src/service/round';

const IP1 = '10.0.0.1';
const IP2 = '10.0.0.2';
const IP3 = '10.0.0.3';
const IP4 = '10.0.0.4';
const IP5 = '10.0.0.5';

describe('PlayerService', () => {
  let service;
  beforeEach(() => {
    service = new RoundService();
    PlayerService.register(IP1, 'Robot 1');
    PlayerService.register(IP2, 'Robot 2');
    PlayerService.register(IP3, 'Robot 3');
    PlayerService.register(IP4, 'Robot 4');
    PlayerService.register(IP5, 'Robot 5');
  });

  it('should create a round', () => {
    const id = service.create([IP1, IP2, IP3, IP4]);

    expect(id).to.equal(0);
  });

  it('should start a round', () => {
    const id = service.create([IP1, IP2, IP3, IP4]);

    service.start(id, 2, 1000);

    expect(service.isActive(id)).to.be.true;
  });

  it('should stop a round', () => {
    const id = service.create([IP1, IP2, IP3, IP4]);
    service.start(id, 2, 1000);

    service.stop(id);

    expect(service.isActive(id)).to.be.false;
  });

  describe('findLastActiveRoundDetails', () => {
    it('should return undefined when not playing', () => {
      const details = service.findLastActiveRoundDetails(IP1);

      expect(details).to.be.undefined;
    });

    it('should return the round details when playing', () => {
      const id = service.create([IP1, IP2, IP3, IP4]);
      service.start(id, 2, 1000);

      const details = service.findLastActiveRoundDetails(IP1);

      expect(details).to.deep.equal({ roundId: 0, playerId: 0 });
    });

    it('should assign appropraite playerIds', () => {
      const id = service.create([IP1, IP2, IP3, IP4]);
      service.start(id, 2, 1000);

      expect(service.findLastActiveRoundDetails(IP1)).to.deep.equal({ roundId: 0, playerId: 0 });
      expect(service.findLastActiveRoundDetails(IP2)).to.deep.equal({ roundId: 0, playerId: 1 });
      expect(service.findLastActiveRoundDetails(IP3)).to.deep.equal({ roundId: 0, playerId: 2 });
      expect(service.findLastActiveRoundDetails(IP4)).to.deep.equal({ roundId: 0, playerId: 3 });
    });

    it('should return undefined for non participating players', () => {
      const id = service.create([IP1, IP2, IP3, IP4]);
      service.start(id, 2, 1000);

      const details = service.findLastActiveRoundDetails(IP5);

      expect(details).to.be.undefined;
    });

    it('should return the last active match', () => {
      const id1 = service.create([IP1, IP2, IP3, IP4]);
      service.start(id1, 2, 1000);
      const id2 = service.create([IP1, IP2, IP3, IP4]);
      service.start(id2, 2, 1000);

      const details = service.findLastActiveRoundDetails(IP1);

      expect(details.roundId).to.equal(1);
    });
  });
});
