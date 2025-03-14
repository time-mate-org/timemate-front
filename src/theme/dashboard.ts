import { createTheme } from "@mui/material";
import { mainTheme } from "./theme";

export const dashboardTheme = createTheme({
  ...mainTheme,
  components: {
    ...mainTheme.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          bgcolor: '#1a1a1a',
          '&.MuiListItem-button:hover': {
            bgcolor: 'rgba(0, 255, 157, 0.1)'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#00ff9d'
        }
      }
    }
  }
});