import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalPausarProduccion(props) {


  return (
    <Dialog
open={props.openPausarProduccionDialog}
onClose={props.handleClosePausarProduccion}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.pausarProduccionRowData && (`PAUSAR la producción del Módulo "${props.pausarProduccionRowData.chasis}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se pausará el Módulo seleccionado.
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClosePausarProduccion()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handlePausarProduccion(props.pausarProduccionRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
