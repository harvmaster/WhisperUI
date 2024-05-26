export const numToLocaleTime = (num: number): string => {
  num = Math.floor(num);
  const seconds = num % 60;
  const minutes = Math.floor(num / 60) % 60;
  const hours = Math.floor(num / 3600);

  if (hours > 0) return `${hours}:${minutes}:${seconds}`;
  if (minutes > 0) return `${minutes}:${seconds}`;

  return `00:${seconds}`;
}

export default numToLocaleTime;