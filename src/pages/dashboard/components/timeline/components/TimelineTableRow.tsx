<<<<<<< Updated upstream
import { Grid2 } from "@mui/material";
=======
import { Grid } from "@mui/material"; // Changed Grid to Grid
>>>>>>> Stashed changes
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
  <CustomTableRow>
    <CustomTableCell
      component="th"
      scope="row"
      isCurrentTimeSlot={isCurrentTimeSlot(
        rowTimeSlot,
        currentTimeSlot as Date
      )}
      isDateCell
    >
<<<<<<< Updated upstream
      <Grid2 container spacing={2}>
        <Grid2 size={8}>{format(rowTimeSlot, "HH:mm")}</Grid2>
        <Grid2 size={4}>
          {isCurrentTimeSlot(rowTimeSlot, currentTimeSlot as Date) && (
            <ArrowForwardIos sx={{ fontSize: 15 }} />
=======
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
        wrap="nowrap"
      >
        <Grid size={{ xs: 8 }} textAlign="center">
          {format(rowTimeSlot, "HH:mm")}
        </Grid>
        <Grid
          size={{ xs: 4 }}
          textAlign="right"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {isCurrentTimeSlot(rowTimeSlot, currentTimeSlot as Date) && (
            <ArrowForwardIos
              sx={{ fontSize: "0.8rem", color: "primary.main" }}
            /> // Adjusted size and color
>>>>>>> Stashed changes
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
