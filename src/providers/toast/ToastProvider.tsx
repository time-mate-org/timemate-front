import { createContext, useState } from "react";
import { Snackbar, Alert, AlertColor, Slide } from "@mui/material";

// Criando o contexto para o Toast
type ToastContextType = {
  showToast: (message: string) => void;
};

type ToastType = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => undefined,
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: "",
    severity: "info",
  });
  const toastExhibitionTime = 5000; // 5 segundos

  const showToast = (message: string, severity: AlertColor = "info") => {
    setToast({ open: true, message, severity });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, toastExhibitionTime);
  };

  // Função para fechar o Toast manualmente
  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Snackbar para exibir o Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={toastExhibitionTime}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slots={{ transition: Slide }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
export { ToastProvider, ToastContext };
