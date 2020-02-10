import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalSolicitar(props) {


  return (
    <Dialog
open={props.openSolicitarPedidoDialog}
onClose={props.handleCloseSolicitarPedido}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.solicitarpedidoRowData && (`Enviar a solicitado el pedido "${props.solicitarpedidoRowData.referencia}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se enviará a solicitado el pedido seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleCloseSolicitarPedido()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleSolicitarPedido(props.solicitarpedidoRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
