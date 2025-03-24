import { Schedule } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { CustomDashboardCard } from "../styled";

export const MetricCard = ({
  metricNumber,
  title,
  metricName,
}: {
  metricNumber: number;
  title: string;
  metricName: string;
}) => {
  return (
    <CustomDashboardCard>
      <Schedule />
      <Typography sx={{ color: "#e2e8f0", fontSize:{md: "30px", sm: '15px'} }}>
        {title}
      </Typography>
      <Typography sx={{ color: "#00ff9d", mt: 1, fontSize: {md: "20px", sm: "13px"} }}>
        {metricNumber} {metricName}
      </Typography>
    </CustomDashboardCard>
  );
};
