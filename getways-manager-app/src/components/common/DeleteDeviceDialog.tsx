import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props:{deleteDevice,setOpenDeleteDevice,openDeleteDevice,row}) {
  const { deleteDevice,setOpenDeleteDevice,openDeleteDevice,row} = props;

  // const [open, setOpen] = React.useState(false);
  const handleDelete = () => {
    deleteDevice(row._id)
  }

  const handleClose = () => {
    setOpenDeleteDevice(false);
  };

  return (
    // <div>
    //   <Button variant="outlined" onClick={handleClickOpen}>
    //     Open draggable dialog
    //   </Button>
      <Dialog
        open={openDeleteDevice}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Getway
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete device with UID: {row?.uid}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>{props.deleteDevice(row._id)}}>Delete</Button>
        </DialogActions>
      </Dialog>
    // </div>
  );
}
