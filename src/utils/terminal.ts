// Colors
const color = {
  red: "\x1b[31m",
  orange: "\x1b[38;5;202m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[36m",
  reset: "\x1b[0m",
};

// Console functions
function getTimestamp() {
  let date = new Date();
  let year: string | number = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  let seconds: string | number = date.getSeconds();
  if (month <= 9) month = `0${month}`;
  if (day <= 9) day = `0${day}`;
  if (hours <= 9) hours = `0${hours}`;
  if (minutes <= 9) minutes = `0${minutes}`;
  if (seconds <= 9) seconds = `0${seconds}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function info(message: string) {
  console.log(`${color.yellow}[${getTimestamp()}]${color.reset} ${message}`);
}

function warn(message: string) {
  console.log(`${color.orange}[${getTimestamp()}]${color.reset} ${message}`);
}

function error(message: string) {
  console.log(`${color.red}[${getTimestamp()}]${color.reset} ${message}`);
}

function success(message: string) {
  console.log(`${color.green}[${getTimestamp()}]${color.reset} ${message}`);
}

function debug(message: string) {
  console.log(`${color.blue}[${getTimestamp()}]${color.reset} ${message}`);
}

const terminal = {
  info,
  warn,
  error,
  success,
  debug,
};

export default terminal;
