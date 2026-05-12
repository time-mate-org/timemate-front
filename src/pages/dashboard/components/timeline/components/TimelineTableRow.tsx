import { Typography } from "@mui/material";
import { format } from "date-fns";
import { CustomTableRow, CustomTableCell } from "../style";
import { isCurrentTimeSlot } from "../utils";
import { Appointment, Professional } from "../../../../../types/models";
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
        currentTimeSlot as Date,
      )}
      isDateCell
      sx={{
        width: "6ch",
        minWidth: "6ch",
        maxWidth: "6ch",
        p: 0,
        left: 0,
        zIndex: 2,
        position: "sticky",
        backgroundColor: "background.background",
      }}
    >
      <Typography variant="body2">{format(rowTimeSlot, "HH:mm")}</Typography>
      {isCurrentTimeSlot(rowTimeSlot, currentTimeSlot as Date) && (
        <ArrowForwardIos
          sx={{
            fontSize: "0.8rem",
            color: "primary.main",
            position: "absolute",
            right: 2,
          }}
        />
      )}
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
