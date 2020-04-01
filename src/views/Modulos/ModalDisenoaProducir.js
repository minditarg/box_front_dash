import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from "components/Input/Input";

export default function ModalDisenoaProducir(props) {
  var formElementsArray = [];
  const [orderForm, setOrderForm] = React.useState({
    chasis: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Chasis',
        fullWidth: true,
        inputProps: {
          autoFocus: true
        }
      },
      value: '',
      validation: {
        required: true

      },
      valid: false,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);




  React.useEffect(() => {
    console.log(props.producirRowData);
   let copyOrderForm = { ...orderForm }

   if(props.producirRowData.chasis)
   copyOrderForm.chasis.value = props.producirRowData.chasis;

   setOrderForm(copyOrderForm);
  }, []);
  const checkValidity = (value, rules) => {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
      isValid = value.toString().trim() !== '';
      textValid = 'El campo es requerido'
    }


    return { isValid: isValid, textValid: textValid };
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValidAlt);
  }

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }



  return (
    <Dialog
      open={props.openDisenoaProducirDialog}
      onClose={props.handleCloseDisenoaProducir}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.producirRowData && (`Enviar a producción el Módulo "${props.producirRowData.chasis}"?`)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Se enviará a producción el Módulo seleccionado. Por favor ingrese numero de chasis
  </DialogContentText>

        {
          formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              textValid={formElement.config.textValid}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangedHandler(event, formElement.id)}
            />
          ))
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleCloseDisenoaProducir()} color="primary">
          Cancelar
 </Button>
        <Button onClick={() => props.handleDisenoaProducir(props.producirRowData,orderForm.chasis.value)} color="primary" >
          Aceptar
 </Button>
      </DialogActions>
    </Dialog>

  );

}
