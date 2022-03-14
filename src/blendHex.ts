const midHex = (a: number, b: number) => {
  const decimal = Math.floor((a + b) / 2);

  return decimal.toString(16).padStart(2, '0');
};

const substringToNumber = (hex: string, start: number, end?: number) => {
  const target = hex.substring(start, end || start + 2);

  return parseInt(target, 16);
};

const indices = [1, 3, 5];

export const blendHex = (a: string, b: string) => {
  return indices.reduce((hex, index) => {
    const first = substringToNumber(a, index);
    const second = substringToNumber(b, index);
    const mid = midHex(first, second);

    return `${hex}${mid}`;
  }, '#');
};
