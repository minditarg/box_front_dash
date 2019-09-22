import React, { Component } from "react";
import axios from "axios";
import Input from "components/Input/Input";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StateNewInsumo } from "./VariablesState";


class NewInsumo extends Component {
  state = {...StateNewInsumo}

  checkValidity = (value, rules) => {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
      isValid = value.toString().trim() !== '';
      textValid = 'El campo es requerido'
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
      textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
      textValid = 'Supera el maximo de caracteres';
    }

    return { isValid: isValid, textValid: textValid };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //alert("modificado");
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newInsumoForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }

    this.setState({
      newInsumoForm: updatedOrderForm,
      formIsValid: formIsValidAlt

    })

  }


  handleSubmitNewInsumo = (event) => {
    event.preventDefault();
    axios.post('/insert-insumos', {
      codigo: event.target[0].value,
      descripcion: event.target[1].value
    })
      .then(res => {
        if (res.data.success == 1) {
          toast.success("Nuevo insumo creado");
          this.resetForm();
        }
        else {
          toast.error("Error");
        }
      })
  }

resetForm = () => {
  let newInsumoForm = { ...this.state.newInsumoForm };
  for(let key in newInsumoForm) {
    newInsumoForm[key].value = ''
  }
  this.setState({
    newInsumoForm:newInsumoForm
  })

}

  render() {
    const formElementsArray = [];
    for (let key in this.state.newInsumoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newInsumoForm[key]
      });
    }
    return (
      <form onSubmit={(event) => {
        this.handleSubmitNewInsumo(event)

      }}>

        <Card>
          <CardHeader color="primary">
            <h4 >Nuevo Insumo</h4>
            <p >
              Formulario alta de Insumo
          </p>
          </CardHeader>
          <CardBody>


            {formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                textValid={formElement.config.textValid}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
              />
            ))}

            <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Guardar</Button>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>
          </CardBody>
        </Card>
      </ form>
    );
  }
}


export default NewInsumo;
