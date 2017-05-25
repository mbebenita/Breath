function leftPad(s, n, c) {
  s = String(s);
  while (s.length < n) {
    s = c + s;
  }
  return s;
}

function padTime(s) {
  return leftPad(s, 2, "0");
}

export function toTime(ms) {
  let milliseconds = ms | 0;
  let seconds = (ms / 1000) | 0;
  let minutes = (seconds / 60) | 0;

  return padTime(minutes) + ":" + padTime(seconds % 60)+ "." + padTime(((milliseconds % 1000) / 10) | 0);
  // return (ms / 1000).toFixed(2);
}