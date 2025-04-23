import { Tooltip, Typography } from "@mui/material";
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
  colors: { [key: number]: string };
};

export const TimelineTableCell = ({
  professional,
  rowTimeSlot,
  currentTimeSlot,
  appointments,
  colors,
}: TimelineTableCellProps) => {
  const navigate = useNavigate();
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
  const tooltipText = isBusyCell
    ? `${cellAppointment?.professional?.name} x ${cellAppointment?.client?.name} | ${cellAppointment?.service?.name} | ${cellTime}`
    : `Clique para marcar as ${cellTime}.`;

  return (
    <CustomTableCell
      key={`${professional.name}-${format(rowTimeSlot as Date, "HH:mm")}`}
      align="center"
      isBusy={isBusyCell}
      professionalColor={colors[cellAppointment?.service.id ?? -1]}
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
      <Tooltip title={tooltipText}>
        <Typography m={0} p={0} fontSize={13}>
          {cellAppointment
            ? toTitle(simplifyName(cellAppointment.client.name))
            : ""}
        </Typography>
      </Tooltip>
    </CustomTableCell>
  );
};
