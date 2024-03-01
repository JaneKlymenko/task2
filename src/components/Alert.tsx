import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Місто успішно додано
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Зрозуміло
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
