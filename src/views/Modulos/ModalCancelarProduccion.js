import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalCancelarProduccion(props) {


  return (
    <Dialog
open={props.openCancelarProduccionDialog}
onClose={props.handleCloseCancelarProduccion}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.cancelarProduccionRowData && (`CANCELAR la producción del Módulo "${props.cancelarProduccionRowData.chasis}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se cancelará el Módulo seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleCloseCancelarProduccion()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleCancelarProduccion(props.cancelarProduccionRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
