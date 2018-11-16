import { callThru } from '../call-thru';
import { passAsync } from './async';

describe('passAsync', () => {
  it('resolves the outcome asynchronously', async () => {
    expect(await callThru(passAsync(), () => 13)()).toBe(13);
  });
  it('rejects on error in the next pass', async () => {

    const error = new Error('Rejected');

    expect(await callThru(passAsync(), () => { throw error; })().catch(err => err)).toBe(error);
  });
});
