import { useContext } from "react";
import { DialogContext } from "../providers/dialog/DialogProvider";
import { AuthContext } from "../providers/auth/AuthProvider";
import { ToastContext } from "../providers/toast/ToastProvider";

export const useDialog = () => useContext(DialogContext)
export const useAuth = () => useContext(AuthContext);
export const useToast = () => useContext(ToastContext);