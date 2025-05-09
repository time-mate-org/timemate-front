import {
  Box,
  Button,
  Container,
  styled,
  TableCell,
  TextField,
} from "@mui/material";
import { LIGHTBLUE } from "../home/components/utils";

export const OutletContainer = styled(Container)(({ theme: { spacing } }) => ({
  flexGrow: 1,
  minHeight: "90vh",
  marginTop: spacing(5), // Espaço para evitar sobreposição com a navbar
  paddingTop: spacing(1),
}));

export const SubmitButton = styled(Button)(({ theme: { spacing } }) => ({
  marginTop: spacing(3),
  backgroundColor: "#00ff9d",
  marginLeft: spacing(1),
  color: "#0a0a0a",
  width: "100%",
  "&:hover": { backgroundColor: "#00e68a" },
}));

export const NumberField = styled(TextField)(() => ({
  "input::-webkit-outer-spin-button": {},
  "input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },

  " input[type=number]": {
    "-moz-appearance": "textfield",
  },
}));

export const ServiceBox = styled(Box)(({ theme: { spacing } }) => ({
  backgroundColor: "#0f172a",
  padding: spacing(2),
  borderRadius: 1,
  transition: "transform 0.2s",
  "&:hover": { transform: "translateY(-2px)", cursor: "pointer" },
}));

export const CustomDashboardCard = styled(Box)(() => ({
  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  borderRadius: "12px",
  padding: "1rem",
  transition: "transform 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  color: "#00ff9d",
  marginBottom: "1rem",
  "&:hover": { transform: "translateY(-2px)", cursor: "pointer" },
}));

export const AvailableServicesBox = styled(Box)(({ theme: { spacing } }) => ({
  background: "#1e293b",
  borderRadius: 2,
  padding: spacing(2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  align: "center",
  textAlign: "center",
  color: "#f0f0f0",
  fontWeight: 600,
}));

const darkBlue = "#0d47a1";

export const CustomizedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400],
      borderWidth: "1px",
    },
    // Borda azul escura no hover
    "&:hover fieldset": {
      borderColor: darkBlue,
    },
    // Borda mais grossa e azul escura quando em foco
    "&.Mui-focused fieldset": {
      borderColor: darkBlue,
      borderWidth: "2px",
    },
  },
  // Altera a cor do label quando o campo está em foco para verde
  "& label.Mui-focused": {
    color: LIGHTBLUE,
  },
  // Define a cor da legenda (helper text) para verde
  "& .MuiFormHelperText-root": {
    color: LIGHTBLUE,
  },
}));
