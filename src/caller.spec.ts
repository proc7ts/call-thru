import { Caller } from './caller';

describe('Caller', () => {
  describe('is', () => {
    it('detects caller', () => {
      expect(Caller.is(Caller.by(() => {}))).toBe(true);
    });
    it('rejects plain function', () => {
      expect(Caller.is(() => {})).toBe(false);
    });
    it('rejects other values', () => {
      expect(Caller.is('some')).toBe(false);
    });
  });
  describe('of', () => {
    it('returns a caller', () => {

      const caller = Caller.by(() => {});

      expect(Caller.of(caller)).toBe(caller);
    });
    it('builds a value returning caller', () => {

      const caller = Caller.of('some');
      const calleeSpy = jasmine.createSpy('callee').and.returnValue('result');

      expect(caller(calleeSpy)).toBe('result');
      expect(calleeSpy).toHaveBeenCalledWith('some');
    });
  });
});
