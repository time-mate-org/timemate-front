import { Grid2 } from "@mui/material";
import { format } from "date-fns";
import { CustomTableRow, CustomTableCell } from "../style";
import { isCurrentTimeSlot } from "../utils";
import { Appointment, Professional } from "../../../types/models";
import { ArrowForwardIos } from "@mui/icons-material";
import { TimelineTableCell } from "./TimelineTableCell";

type TimelineTableRowProps = {
  rowTimeSlot: Date;
  currentTimeSlot?: Date | null;
  professionals: Professional[];
  appointments: Appointment[];
  colors: { [key: number]: string };
};

export const TimelineTableRow = ({
  rowTimeSlot,
  currentTimeSlot,
  professionals,
  appointments,
  colors,
}: TimelineTableRowProps) => (
  <CustomTableRow
    isCurrentTimeSlot={isCurrentTimeSlot(rowTimeSlot, currentTimeSlot as Date)}
  >
    <CustomTableCell
      component="th"
      scope="row"
      isCurrentTimeSlot={isCurrentTimeSlot(
        rowTimeSlot,
        currentTimeSlot as Date
      )}
      isDateCell
    >
      <Grid2 container spacing={2}>
        <Grid2 size={8}>{format(rowTimeSlot, "HH:mm")}</Grid2>
        <Grid2 size={4}>
          {isCurrentTimeSlot(rowTimeSlot, currentTimeSlot as Date) && (
            <ArrowForwardIos sx={{ fontSize: 15 }} />
          )}
        </Grid2>
      </Grid2>
    </CustomTableCell>
    {professionals?.map((professional) => (
      <TimelineTableCell
        key={`${format(rowTimeSlot, "HH:mm")}-${professional.id}`}
        professional={professional}
        currentTimeSlot={currentTimeSlot}
        rowTimeSlot={rowTimeSlot}
        appointments={appointments}
        colors={colors}
      />
    ))}
  </CustomTableRow>
);
