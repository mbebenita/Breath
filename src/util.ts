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
}

export function loadState(uri: string, onDone: (json: any) => void) {
  var xhr = new XMLHttpRequest();
  let self = this;
  xhr.addEventListener("load", function () {
    onDone(JSON.parse(this.response));
  });
  let url = "https://api.myjson.com/bins/" + uri;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send();
}

export function updateState(uri: string, json: any, onDone: (json: any) => void) {
  var xhr = new XMLHttpRequest();
  let self = this;
  xhr.addEventListener("load", function () {
    onDone(JSON.parse(this.response));
  });
  let url = "https://api.myjson.com/bins/" + uri;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(json));
}

export function saveState(json: any, onDone: (uri: string) => void) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    let uri = JSON.parse(this.response).uri;
    uri = uri.substring(uri.lastIndexOf("/") + 1);
    onDone(uri);
  });
  xhr.open("POST", "//api.myjson.com/bins", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(json));
}
