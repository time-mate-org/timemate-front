import { styled, TableCell, TableRow } from "@mui/material";

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
    isCurrentTimeSlot,
    isDateCell,
    professionalColor = "#cc1212",
  }) => ({
    backgroundColor: isDateCell
      ? "#0f0f0f"
      : isBusy
      ? professionalColor
      : "#00ff9d",
    color: isCurrentTimeSlot ? "#f04444" : "#f0f0f0",
  })
);

export const CustomTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isCurrentTimeSlot",
})<{ isCurrentTimeSlot: boolean }>(({ isCurrentTimeSlot }) => ({
  border: isCurrentTimeSlot ? "2px solid rgb(255, 230, 0)" : "none",
  "&:last-child td, &:last-child th": { border: 0 },
}));
