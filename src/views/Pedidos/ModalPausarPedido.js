import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalPausarPedido(props) {


  return (
    <Dialog
open={props.openPausarPedidoDialog}
onClose={props.handleClosePausarPedido}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.pausarPedidoRowData && (`PAUSAR la solicitud del pedido "${props.pausarPedidoRowData.referencia}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se pausará el pedido seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClosePausarPedido()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handlePausarPedido(props.pausarPedidoRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
