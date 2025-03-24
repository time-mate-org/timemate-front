export const toTitle = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const toEstimatedTimeDisplay = (timeInMinutes: number): string =>
  `${Math.floor(timeInMinutes / 60)}:${timeInMinutes % 60}`;
