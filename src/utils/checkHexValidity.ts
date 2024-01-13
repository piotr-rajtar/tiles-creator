export const checkHexValidity = (inputColor: string): boolean => {
  const hexRegExp = /(^#[0-9A-F]{6}$)/i;

  return hexRegExp.test(inputColor);
};
