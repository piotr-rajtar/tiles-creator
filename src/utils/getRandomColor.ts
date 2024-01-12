const hexCharacters: Array<string | number> = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

const getRandomHexNumber = (): number => Math.floor(Math.random() * 16);

export const getRandomColor = (): string => {
  let color = '#';

  for (let index = 0; index < 6; index++) {
    color += hexCharacters[getRandomHexNumber()];
  }

  return color;
};
