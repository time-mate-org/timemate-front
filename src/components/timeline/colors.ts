import { Service } from "../../types/models";

type RGBType = {
  r: number;
  g: number;
  b: number;
};
// Distância mínima desejada entre cores no espaço RGB (pode ser ajustada conforme necessário)
const MIN_DISTANCE = 500;
// Converte uma cor hexadecimal para um objeto { r, g, b }
const hexToRgb = (hex: string): RGBType => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

// Calcula a distância Euclidiana entre duas cores RGB
const colorDistance = (c1: RGBType, c2: RGBType) => {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

// Gera uma cor aleatória no mesmo padrão que você usava
const generateRandomColor = () =>
  "#000000".replace(/0/g, () => (~~(2 + Math.random() * 6)).toString(16));

const getNewServiceColors = (
  services: Service[]
): { [key: number]: string } => {
  // Armazena as cores geradas já convertidas para RGB
  const generatedColors: RGBType[] = [];
  const newColors: { [key: number]: string } = {};

  services?.forEach((service) => {
    let randomColor,
      rgb: RGBType | undefined,
      attempts = 0;
    // Tenta gerar uma cor que esteja "distante" das já geradas
    do {
      randomColor = generateRandomColor();
      rgb = hexToRgb(randomColor);
      attempts++;
      // Evita loop infinito com um limite de tentativas
    } while (
      generatedColors.some(
        (prev: RGBType) => colorDistance(prev, rgb as RGBType) < MIN_DISTANCE
      ) &&
      attempts < 100
    );

    // Adiciona a cor aprovada à lista e ao objeto de cores
    generatedColors.push(rgb);
    newColors[service?.id ?? -1] = randomColor;
  });
  return newColors;
};

export { getNewServiceColors };
