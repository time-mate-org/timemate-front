export const toTitle = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const toEstimatedTimeDisplay = (timeInMinutes: number): string =>
  `${Math.floor(timeInMinutes / 60)}:${timeInMinutes % 60}`;

export const cleanPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replace(/\D/g, "");
