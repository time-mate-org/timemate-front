<<<<<<< Updated upstream
import { Grid2, styled, TableCell, TableRow, Typography } from "@mui/material";
import { invertColor } from "./utils";
=======
import {
  styled,
  TableCell,
  TableRow,
  Typography,
  alpha,
  Grid,
  CSSObject,
} from "@mui/material"; // Changed Grid to Grid
>>>>>>> Stashed changes

export const CustomTableCell = styled(TableCell, {
  shouldForwardProp: (prop) =>
    prop !== "isBusy" &&
    prop !== "isCurrentTimeSlot" &&
    prop !== "isDateCell" &&
    prop !== "professionalColor",
})<{
  isBusy?: boolean;
  isCurrentTimeSlot?: boolean;
  isDateCell?: boolean;
<<<<<<< Updated upstream
  professionalColor?: string;
}>(
  ({
    isBusy,
    isDateCell,
    isCurrentTimeSlot,
    professionalColor = "#f44336", // vermelho moderno
  }) => {
    let backgroundColor: string;
    let opacity: number = 0;
=======
  serviceColor?: string;
}>(({ theme, isBusy, isDateCell, isCurrentTimeSlot, serviceColor }) => {
  const baseStyles: CSSObject = {
    padding: theme.spacing(1, 1.5),
    textAlign: "center",
    fontSize: theme.typography.body2.fontSize,
    borderBottom: `1px solid ${theme.palette.divider}`, // Apply bottom border to all cells for consistency
    cursor: "default", // Default cursor
  };
>>>>>>> Stashed changes

    // Se a célula representa uma data, usa fundo mais escuro e negrito
    if (isDateCell) {
      backgroundColor = "#1e1e2f";
      opacity = 1;
    } else if (isBusy) {
      backgroundColor = professionalColor;
      opacity = isCurrentTimeSlot ? 1 : 0.9;
    } else {
      backgroundColor = "#2c2c3a";
      opacity = 0.9;
    }

<<<<<<< Updated upstream
=======
  if (isBusy) {
    const busyBackgroundColor =
      serviceColor || theme.palette.action.disabledBackground;
>>>>>>> Stashed changes
    return {
      opacity,
      backgroundColor,
      textAlign: "center",
      color: isCurrentTimeSlot ? invertColor(backgroundColor) : "#e0e0e0",
      padding: "3px 3px",
      border: "none",
      fontSize: 12,
      fontWeight: isDateCell ? "bold" : "normal",
      transition: "box-shadow 0.3s ease, background-color 0.3s ease",
      "&:hover": {
        cursor: "pointer",
      },
      borderBottom: isCurrentTimeSlot ? "1px dotted yellow" : "none",
      borderTop: isCurrentTimeSlot ? "1px dotted yellow" : "none",
    };
  }
);

export const CustomTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isCurrentTimeSlot",
})<{ isCurrentTimeSlot: boolean }>(({ isCurrentTimeSlot }) => ({
  backgroundColor: "#1faf1f",
  borderBottom: "none",
  // Efeito hover para modernidade e melhor usabilidade
  "&:hover": {
    backgroundColor: "#1fff1f",
    borderBottom: "2px dotted #fff",
  },
  // Se for o slot de tempo atual, adiciona um destaque lateral
  ...(isCurrentTimeSlot && {
    borderLeft: "4px solid rgba(255, 235, 59, 0.58)",
    borderBottom: "1px dotted rgba(255,255,255, 0.5)",
    borderTop: "1px dotted rgba(255,255,255, 0.5)",
    marginLeft: "4px",
    paddingLeft: "4px",
    backgroundColor: "#3a5",
  }),
}));

// Container principal com visual dark e borda sutil
<<<<<<< Updated upstream
export const TimelineContainer = styled(Grid2)(({ theme }) => ({
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  border: "1px solid #444",
  backgroundColor: "#1e1e2f",
=======
export const TimelineContainer = styled(Grid)(({ theme }) => ({
  // Changed Grid to Grid
  borderRadius: theme.shape.borderRadius, // Use theme's border radius
  border: `1px solid ${theme.palette.divider}`, // Use theme's divider color
  backgroundColor: theme.palette.background.default, // Use theme's default background
>>>>>>> Stashed changes
  padding: theme.spacing(2),
}));

<<<<<<< Updated upstream
// Cabeçalho de "SERVIÇOS"
export const HeaderGrid = styled(Grid2)(() => ({
  width: "100%",
}));

export const HeaderTypography = styled(Typography)(() => ({
=======
// Cabeçalho de "SERVIÇOS" - This seems to be for a different header, not TableHead
export const HeaderGrid = styled(Grid)(() => ({
  // Changed Grid to Grid
  width: "100%",
}));

export const HeaderTypography = styled(Typography)(({ theme }) => ({
  // Added theme
>>>>>>> Stashed changes
  textAlign: "center",
  color: "#e0e0e0",
  fontWeight: "bold",
}));
