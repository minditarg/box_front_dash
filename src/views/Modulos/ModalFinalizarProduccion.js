import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalFinalizarProduccion(props) {


  return (
    <Dialog
open={props.openFinalizarProduccionDialog}
onClose={props.handleCloseFinalizarProduccion}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.finalizarProduccionRowData && (`Finalizar la producción del Módulo "${props.finalizarProduccionRowData.chasis}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se enviará a listado de finalizados el Módulo seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleCloseFinalizarProduccion()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleFinalizarProduccion(props.finalizarProduccionRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
