import { Button, styled, Typography } from "@mui/material";

// Define os tamanhos para cada variante, ordenados por breakpoints
const variantSizes = {
  h1: { large: "4rem", md: "5rem", sm: "2rem", xs: "1.5rem" },
  h2: { large: "2.5rem", md: "2rem", sm: "1.75rem", xs: "1.5rem" },
  h3: { large: "2rem", md: "1.75rem", sm: "1.5rem", xs: "1.25rem" },
  h4: { large: "1.75rem", md: "1.5rem", sm: "1.25rem", xs: "1rem" },
  h5: { large: "1.5rem", md: "1.25rem", sm: "1rem", xs: "0.875rem" },
  h6: { large: "1.25rem", md: "1rem", sm: "0.875rem", xs: "0.75rem" },
};

// Extendemos as props do Typography para receber a propriedade 'initialVariant'
type VariantPropsType = "h1" | "h2" | "h3" | "h4" | "h5";

// Criamos um componente styled que utiliza a prop 'initialVariant' para definir os tamanhos
const ResponsiveTypography = styled(Typography, {
  shouldForwardProp: (prop: string) => prop !== "initialVariant",
})<{ initialVariant: VariantPropsType }>(({ theme, initialVariant }) => {
  const sizes =
    variantSizes[initialVariant as keyof typeof variantSizes] ||
    variantSizes.h1;
  return {
    fontSize: sizes.large,
    margin: 0,
    padding: 0,
    fontWeight: 700,
    // A partir do breakpoint 'lg' (abaixo de telas muito grandes) ajusta para 'md'
    [theme.breakpoints.down("lg")]: {
      fontSize: sizes.md,
    },
    // Para telas médias
    [theme.breakpoints.down("md")]: {
      fontSize: sizes.sm,
    },
    // Para telas pequenas, como celulares
    [theme.breakpoints.down("sm")]: {
      fontSize: sizes.xs,
    },
  };
});

const CustomNavItem = styled(Button)(() => ({
  color: "#1f1f1f",
  fontSize: 18,
  fontWeight: 600,
  "&:hover": {
    color: "#a1a1f1",
    backgroundColor: "transparent"
  },
}));

export { ResponsiveTypography, CustomNavItem };
