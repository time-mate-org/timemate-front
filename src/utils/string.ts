export const toTitle = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const toEstimatedTimeDisplay = (timeInMinutes: number): string =>
  `${Math.floor(timeInMinutes / 60)}:${timeInMinutes % 60}`;

export const cleanPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replace(/\D/g, "");

export const formatPhoneNumber = (value: string): string => {
  const cleaned = cleanPhoneNumber(value);

  // Aplica a máscara conforme o número de dígitos
  if (cleaned.length <= 2) {
    // Formato: (xx
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    // Formato: (xx) xxxx
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}`;
  } else if (cleaned.length <= 10) {
    // Formato: (xx) xxxx-xxxx
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  } else {
    // Formato: (xx) xxxx-xxxxx (para números com o nono dígito)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
};
