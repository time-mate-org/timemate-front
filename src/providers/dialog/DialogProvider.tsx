import { createContext, forwardRef, ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";

type OpenDialogParamType = {
  title: string;
  description: string;
  buttonLabel: string;
  action: () => void;
};

type DialogContextType = {
  openDialog: (param: OpenDialogParamType) => void;
  openImageDialog: (imgSrc: string) => void;
};

const defaultDialogContext = {
  openDialog: () => undefined,
  openImageDialog: () => undefined,
};

const DialogContext = createContext<DialogContextType>(defaultDialogContext);

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Confirmar");
  const [imgPath, setImgPath] = useState("");
  const [action, setAction] = useState<() => void>(() =>
    Promise.resolve(undefined)
  );
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setButtonLabel("");
    setImgPath("")
    setAction(() => Promise.resolve(undefined));
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (action) action();
    handleClose();
  };

  const openDialog = ({
    title,
    description,
    buttonLabel,
    action,
  }: OpenDialogParamType) => {
    setTitle(title);
    setDescription(description);
    setButtonLabel(buttonLabel);
    setAction(() => action);
    setOpen(true);
  };
  const openImageDialog = (imgSrc: string) => {
    setImgPath(imgSrc);
    setTitle("Galeria")
    setOpen(true);
  };

  return (
    <DialogContext.Provider value={{ openDialog, openImageDialog }}>
      {children}
      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {imgPath ? (
          <Box component="img" src={imgPath} />
        ) : (
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {description}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
              <Button onClick={handleConfirm}>{buttonLabel}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
};

export { DialogContext, DialogProvider };
