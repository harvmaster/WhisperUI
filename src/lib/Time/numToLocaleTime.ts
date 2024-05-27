export const numToLocaleTime = (num: number): string => {
  num = Math.floor(num);
  const seconds = num % 60;
  const minutes = Math.floor(num / 60) % 60;
  const hours = Math.floor(num / 3600);

  if (hours > 0) return `${hours}:${getMinutes(minutes)}:${getSeconds(seconds)}`;
  if (minutes > 0) return `${minutes}:${getSeconds(seconds)}`;
  return `0:${getSeconds(seconds)}`;
}

const getMinutes = (num: number): string => {
  const minutes = Math.floor(num / 60) % 60;
  if (minutes < 10) return `0${minutes}`;
  return minutes.toString();
}

const getSeconds = (num: number): string => {
  const seconds = num % 60;
  if (seconds < 10) return `0${seconds}`;
  return seconds.toString();
}

export default numToLocaleTime;