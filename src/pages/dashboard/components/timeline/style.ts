import { styled, TableCell, TableRow, Typography, Grid, alpha } from "@mui/material"; // Changed Grid2 to Grid
import { invertColor } from "./utils"; // Keep if used, otherwise remove

export const CustomTableCell = styled(TableCell, {
  shouldForwardProp: (prop) =>
    prop !== "isBusy" &&
    prop !== "isCurrentTimeSlot" &&
    prop !== "isDateCell" &&
    prop !== "serviceColor", // Renamed professionalColor to serviceColor for clarity
})<{
  isBusy?: boolean;
  isCurrentTimeSlot?: boolean;
  isDateCell?: boolean;
  serviceColor?: string; 
}>(({ theme, isBusy, isDateCell, isCurrentTimeSlot, serviceColor }) => {
  const baseStyles = {
    padding: theme.spacing(1, 1.5),
    textAlign: "center",
    fontSize: theme.typography.body2.fontSize,
    borderBottom: `1px solid ${theme.palette.divider}`, // Apply bottom border to all cells for consistency
    cursor: "default", // Default cursor
  };

  if (isDateCell) {
    return {
      ...baseStyles,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
      position: "relative", // For potential absolute positioned elements inside like the arrow
      ...(isCurrentTimeSlot && {
        // Highlight for current time slot in the time column
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main, // Make text color primary for current time
        fontWeight: theme.typography.fontWeightBold,
      }),
    };
  }

  if (isBusy) {
    const busyBackgroundColor = serviceColor || theme.palette.action.disabledBackground;
    return {
      ...baseStyles,
      backgroundColor: alpha(busyBackgroundColor, 0.3), // Made service color less intense
      color: theme.palette.getContrastText(alpha(busyBackgroundColor, 0.3)),
      cursor: "pointer",
      "&:hover": {
        backgroundColor: alpha(busyBackgroundColor, 0.5),
      },
      ...(isCurrentTimeSlot && {
        borderTop: `1px dashed ${theme.palette.primary.main}`,
        borderBottom: `1px dashed ${theme.palette.primary.main}`,
        color: theme.palette.primary.main, // Indicate current time slot subtly
      }),
    };
  }

  // Available slot
  return {
    ...baseStyles,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.disabled, // Default text for available slot (e.g., for "Agendar")
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
    ...(isCurrentTimeSlot && {
      borderTop: `1px dashed ${theme.palette.primary.main}`,
      borderBottom: `1px dashed ${theme.palette.primary.main}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.1), // Subtle background for current available slot
    }),
  };
});

export const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "transparent", // Rows are transparent, cell colors define appearance
  borderBottom: `1px solid ${theme.palette.divider}`, // Default border for rows, might be overridden by cell
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.hover, 0.5), // Subtle hover for the entire row
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0, // Remove border for the last row's cells
  },
}));

// Container principal com visual dark e borda sutil
export const TimelineContainer = styled(Grid)(({ theme }) => ({ // Changed Grid2 to Grid
  borderRadius: theme.shape.borderRadius, // Use theme's border radius
  border: `1px solid ${theme.palette.divider}`, // Use theme's divider color
  backgroundColor: theme.palette.background.default, // Use theme's default background
  padding: theme.spacing(2),
  marginTop: theme.spacing(2), // Add some margin from TimelineHeader
}));

// Cabeçalho de "SERVIÇOS" - This seems to be for a different header, not TableHead
export const HeaderGrid = styled(Grid)(() => ({ // Changed Grid2 to Grid
  width: "100%",
}));

export const HeaderTypography = styled(Typography)(({theme}) => ({ // Added theme
  textAlign: "center",
  color: theme.palette.text.primary, // Use theme's primary text color
  fontWeight: "bold",
}));
