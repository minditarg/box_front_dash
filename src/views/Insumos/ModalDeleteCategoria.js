import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDeleteCategoria(props) {


  return (
    <Dialog
open={props.openDeleteDialog}
onClose={props.handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.deleteRowData && (`Eliminar la categoria "${props.deleteRowData.codigo}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se eliminará la categoría seleccionada. Realmente desea eliminarla?
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClose()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleDelete(props.deleteRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
