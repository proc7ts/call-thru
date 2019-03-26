import { isDefined, isNotPresent, isPresent, isUndefined } from './presence';

describe('isPresent', () => {
  it('returns `false` on `null`', () => {
    expect(isPresent(null)).toBe(false);
  });
  it('returns `false` on `undefined`', () => {
    expect(isPresent(undefined)).toBe(false);
  });
  it('returns `true` otherwise', () => {
    expect(isPresent(0)).toBe(true);
  });
});

describe('isNotPresent', () => {
  it('returns `true` on `null`', () => {
    expect(isNotPresent(null)).toBe(true);
  });
  it('returns `true` on `undefined`', () => {
    expect(isNotPresent(undefined)).toBe(true);
  });
  it('returns `false` otherwise', () => {
    expect(isNotPresent(0)).toBe(false);
  });
});

describe('isDefined', () => {
  it('returns `true` on `null`', () => {
    expect(isDefined(null)).toBe(true);
  });
  it('returns `false` on `undefined`', () => {
    expect(isDefined(undefined)).toBe(false);
  });
  it('returns `true` otherwise', () => {
    expect(isDefined(0)).toBe(true);
  });
});

describe('isUndefined', () => {
  it('returns `false` on `null`', () => {
    expect(isUndefined(null)).toBe(false);
  });
  it('returns `true` on `undefined`', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
  it('returns `false` otherwise', () => {
    expect(isUndefined(0)).toBe(false);
  });
});
