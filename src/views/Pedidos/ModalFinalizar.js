import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalFinalizar(props) {


  return (
    <Dialog
open={props.openFinalizarDialog}
onClose={props.handleCloseFinalizar}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.finalizarRowData && (`Confirmar la recepcion del pedido "${props.finalizarRowData.referencia}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se enviará a listado de finalizados el pedido seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleCloseFinalizar()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleFinalizar(props.finalizarRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
