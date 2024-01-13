import { describe, expect, it } from 'vitest';

import { checkHexValidity } from '../checkHexValidity';

describe('checkHexValidity', () => {
  it('should return false when validated input is too short', () => {
    const hexToCheck = '#fff';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(false);
  });

  it('should return false when validated input is too long', () => {
    const hexToCheck = '#01223456';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(false);
  });

  it('should return false when validated input containes not allowed characters', () => {
    const hexToCheck = '#FFFFF%';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(false);
  });

  it('should retuen false when validated input contains letters out of hex range', () => {
    const hexToCheck = '#ABCDEG';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(false);
  });

  it('should return false when validated input not starts with #', () => {
    const hexToCheck = 'ABCDEF';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(false);
  });

  it('should return true when validated input is upper-cased and correct', () => {
    const hexToCheck = '#ABCDEF';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(true);
  });

  it('should return true when validated input is lower-cased and correct', () => {
    const hexToCheck = '#abcdef';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(true);
  });

  it('should return true when validated input is mix-cased and correct', () => {
    const hexToCheck = '#AbCd44';
    const result = checkHexValidity(hexToCheck);

    expect(result).toBe(true);
  });
});
