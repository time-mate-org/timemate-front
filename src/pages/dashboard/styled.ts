import {
  Box,
  Button,
  Container,
  Drawer,
  ListItemButton,
  styled,
  TextField,
} from "@mui/material";

export const DashboardDrawer = styled(Drawer)(({ theme }) => ({
  width: theme.spacing(25),
  flexShrink: 0,
  zIndex: 1,
  "& .MuiDrawer-paper": {
    width: 240,
    bgcolor: "#0a0a0a",
    borderRight: "none",
  },
}));

export const DrawerListItem = styled(ListItemButton)(
  ({ theme: { spacing } }) => ({
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    "&.Mui-selected": {
      backgroundColor: "rgba(0, 255, 157, 0.1)",
      "&:hover": {
        backgroundColor: "rgba(0, 255, 157, 0.2)",
      },
    },
  })
);

export const OutletContainer = styled(Container)(({ theme: { spacing } }) => ({
  flexGrow: 1,
  pading: spacing(3),
  minHeight: "100vh",
  marginTop: spacing(10), // Espaço para evitar sobreposição com a navbar
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

export const ServiceBox = styled(Box)(() => ({
  backgroundColor: "#0f172a",
  padding: 2,
  borderRadius: 1,
  transition: "transform 0.2s",
  "&:hover": { transform: "translateY(-2px)" },
}));
