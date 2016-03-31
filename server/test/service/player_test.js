/* eslint-env mocha */
import { expect } from 'chai';

import { PlayerService } from '../../src/service/player';


describe('PlayerService', () => {
  let service;
  beforeEach(() => {
    service = new PlayerService();
  });

  it('should register player by ip', () => {
    service.register('192.168.0.1', 'Some robot');

    expect(service.list()[0].ip).to.equal('192.168.0.1');
    expect(service.list()[0].name).to.equal('Some robot');
  });

  it('should register multiple players by ip', () => {
    service.register('192.168.0.1', 'Robot 1');
    service.register('192.168.0.2', 'Robot 2');

    expect(service.list().length).to.equal(2);
  });

  it('should overwrite player when registering for a second time', () => {
    service.register('192.168.0.1', 'Robot 1');
    service.register('192.168.0.1', 'Robot 2');

    expect(service.list()[0].name).to.equal('Robot 2');
  });

  describe('a registered player', () => {
    it('should be online', () => {
      service.register('192.168.0.1', 'Robot 1');

      expect(service.list()[0].online).to.equal(true);
    });
  });

  describe('a unregistered player', () => {
    it('should not be online', () => {
      service.register('192.168.0.1', 'Robot 1');

      service.unregister('192.168.0.1');

      expect(service.list()[0].online).to.equal(false);
    });
  });
});
