import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import  { useState } from "react";

interface PropsType {
  message: string;
  severity: "success" | "error" | "warning" | "info";
}
const SnackbarAlert= ({ message, severity }:PropsType) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(true);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
