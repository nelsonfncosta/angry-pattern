// point (x,y) inside circle (a,b) with radius (r) ?
export function pointInsideCircle(a, b, x, y, r) {
  const distance = (a - x) * (a - x) + (b - y) * (b - y);

  return distance < r;
}
