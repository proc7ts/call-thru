import { nextCall, NextCall, nextCallKey } from './next-call';

describe('Next call', () => {
  describe('nextCall', () => {
    it('returns a next call', () => {

      const next = nextCall(() => {});

      expect(NextCall.of(next)).toBe(next);
    });
    it('builds a value returning next call', () => {

      const next = NextCall.of('some');
      const calleeSpy = jest.fn(() => 'result');

      expect(next[nextCallKey](calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('some');
    });
  });
  describe('NextCall', () => {
    describe('is', () => {
      it('detects next function call', () => {
        expect(NextCall.is(nextCall(() => {}))).toBe(true);
      });
      it('rejects plain function', () => {
        expect(NextCall.is(() => {
        })).toBe(false);
      });
      it('rejects other values', () => {
        expect(NextCall.is('some')).toBe(false);
      });
    });
  });
});
