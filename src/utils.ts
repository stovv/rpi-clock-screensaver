import config from "./config.ts";

export const selectHour = (hour: number): number | null => {
  let hours = Object.keys(config).map(Number);
  if (hours.length === 0) return null;
  const selected = hours[0];

  if (hours.length === 1) return selected;

  if (hours.includes(hour)){
    return hour;
  }

  hours = hours.sort((left, right) => left - right);

  for (let index = 0; index < hours.length - 1; index++) {
    const left = hours[index];
    const right = hours[index + 1];
    if (hour >= left && hour < right) return left;
  }

  return hours[hours.length - 1];
}