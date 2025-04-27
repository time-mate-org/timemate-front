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
    let opacity: number = 0;

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
export const TimelineContainer = styled(Grid2)(({ theme }) => ({
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
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
