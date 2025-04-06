import { Grid2, styled, TableCell, TableRow, Typography } from "@mui/material";
import { invertColor } from "./utils";

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
  professionalColor?: string;
}>(
  ({
    isBusy,
    isDateCell,
    isCurrentTimeSlot,
    professionalColor = "#f44336", // vermelho moderno
  }) => {
    let backgroundColor: string;

    // Se a célula representa uma data, usa fundo mais escuro e negrito
    if (isDateCell) backgroundColor = "#1e1e2f";
    else if (isBusy) backgroundColor = professionalColor;
    else backgroundColor = "#2c2c3a";

    return {
      backgroundColor,
      textAlign: "center",
      color: isCurrentTimeSlot ? invertColor(backgroundColor) : "#e0e0e0",
      padding: "3px 3px",
      border: "none",
      fontSize: 12,
      fontWeight: isDateCell ? "bold" : "normal",
      transition: "box-shadow 0.3s ease, background-color 0.3s ease",
      "&:hover": {
        cursor: isBusy ? "pointer" : "default",
      },
    };
  }
);

export const CustomTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isCurrentTimeSlot",
})<{ isCurrentTimeSlot: boolean }>(({ isCurrentTimeSlot }) => ({
  backgroundColor: "transparent",
  borderBottom: "none",
  // Efeito hover para modernidade e melhor usabilidade
  "&:hover": {
    backgroundColor: "#333342",
    borderBottom: '1px dotted #fff'
  },
  // Se for o slot de tempo atual, adiciona um destaque lateral
  ...(isCurrentTimeSlot && {
    borderLeft: "4px solid rgba(255, 235, 59, 0.58)",
    borderBottom: "1px dotted rgba(255,255,255, 0.5)",
    borderTop: "1px dotted rgba(255,255,255, 0.5)",
    marginLeft: "4px",
    paddingLeft: "4px",
  }),
}));

// Container principal com visual dark e borda sutil
export const TimelineContainer = styled(Grid2)(({ theme }) => ({
  border: "1px solid #444",
  backgroundColor: "#1e1e2f",
  padding: theme.spacing(2),
}));

// Cabeçalho de "SERVIÇOS"
export const HeaderGrid = styled(Grid2)(() => ({
  width: "100%",
}));

export const HeaderTypography = styled(Typography)(() => ({
  textAlign: "center",
  color: "#e0e0e0",
  fontWeight: "bold",
}));

// Cartão individual de serviço com layout vertical
export const ServiceGrid = styled(Grid2)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const ServiceCard = styled(Grid2)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
}));
