import { Tooltip, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import { toTitle } from "../../../../../utils/string";
import { CustomTableCell } from "../style";
import {
  isBusy,
  getCellAppointment,
  isCurrentTimeSlot,
  simplifyName,
} from "../utils";
import { Appointment, Professional } from "../../../../../types/models";
import { useNavigate } from "react-router-dom";

type TimelineTableCellProps = {
  professional: Professional;
  rowTimeSlot: Date;
  currentTimeSlot?: Date | null;
  appointments: Appointment[];
  colors: { [key: number]: string }; // These are service colors
};

export const TimelineTableCell = ({
  professional,
  rowTimeSlot,
  currentTimeSlot,
  appointments,
  colors,
}: TimelineTableCellProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isBusyCell = isBusy({
    professional,
    currentTime: rowTimeSlot,
    appointments,
  });
  const cellAppointment = getCellAppointment(
    professional,
    rowTimeSlot,
    appointments
  );
  const cellTime = format(rowTimeSlot as Date, "HH:mm");
  const professionalName = professional.name.split(" ")[0]; // Get first name for brevity in tooltip
  const tooltipText = isBusyCell
    ? `${toTitle(cellAppointment?.service?.name ?? "")} com ${toTitle(professionalName)} (Cliente: ${toTitle(cellAppointment?.client?.name ?? "")}) às ${cellTime}`
    : `Agendar com ${toTitle(professionalName)} às ${cellTime}`;

  return (
    <CustomTableCell
      key={`${professional.name}-${format(rowTimeSlot as Date, "HH:mm")}`}
      align="center"
      isBusy={isBusyCell}
      serviceColor={colors[cellAppointment?.service.id ?? -1]} // Updated prop name
      onClick={() =>
        isBusyCell
          ? navigate(`/dashboard/appointment/edit/${cellAppointment?.id}`, {
              state: {},
            })
          : navigate("/dashboard/appointment/new", {
              state: {
                professionalId: professional.id,
                timeSlot: rowTimeSlot,
              },
            })
      }
      isCurrentTimeSlot={isCurrentTimeSlot(
        rowTimeSlot,
        currentTimeSlot as Date
      )}
    >
      <Tooltip title={tooltipText} placement="top">
        <Typography
          variant="caption" // Using variant="caption" for potentially smaller, secondary text
          display="block" // Ensures Typography takes full width for centering if needed
          sx={{
            // Color is now primarily driven by CustomTableCell styles
            // For busy cells, CustomTableCell sets contrast text.
            // For available cells, CustomTableCell sets theme.palette.text.disabled, changing on hover.
            fontWeight: isBusyCell ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minHeight: "1.2em", // Ensure similar height for empty/filled text
          }}
        >
          {isBusyCell && cellAppointment
            ? toTitle(simplifyName(cellAppointment.client.name))
            : isBusyCell // Handles case where cell is busy but somehow no appointment (should not happen)
            ? "Ocupado"
            : "Disponível"} 
        </Typography>
      </Tooltip>
    </CustomTableCell>
  );
};
