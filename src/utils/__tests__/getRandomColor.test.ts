import { describe, expect, it } from 'vitest';

import { getRandomColor } from '../getRandomColor';

describe('getRandomColor', () => {
  it('return color starts with #', () => {
    const color = getRandomColor();

    expect(color.at(0)).toBe('#');
  });

  it('return color string contains 6 characters', () => {
    const color = getRandomColor();

    const hexNumber = color.slice(1);
    expect(hexNumber.length).toBe(6);
  });
});
