import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalCancelar(props) {


  return (
    <Dialog
open={props.openCancelarDialog}
onClose={props.handleCloseCancelar}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.cancelarProduccionRowData && (`CANCELAR el pedido "${props.cancelarRowData.referencia}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se cancelará el pedido seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleCloseCancelar()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleCancelar(props.cancelarRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
