export function getRandomColor() {
  let letters = '89ABCDEF'; // Use only bright letters for a higher contrast on dark backgrounds
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
