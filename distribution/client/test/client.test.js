const assert = require('assert');
const Client = require('../src/client');

describe('The base client module', () => {
  it('should interpret properly', () => {
    assert(Client);
  });

  describe('flavorCheck', () => {
    it('should throw an error with no flavor defined', () => {
      expect(() => {
        delete process.env.FLAVOR;
        new Client();
      }).toThrow();
    });
  });

  describe('isOffline()', () => {
    process.env.FLAVOR = 'docker-cloud';
    let client = new Client();

    it('should default to false', () => {
      expect(client.isOffline()).toBeFalsy();
    });

    describe('when EVERGREEN_OFFLINE is set', () => {
      beforeEach(() => {
        jest.resetModules();
        process.env.EVERGREEN_OFFLINE = '1';
      });

      afterEach(() => {
        jest.resetModules();
      });

      it('should be true', () => {
        expect(client.isOffline()).toBeTruthy();
      });
    });
  });
});
