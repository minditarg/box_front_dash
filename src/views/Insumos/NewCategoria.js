import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import { Route, Switch, Link, withRouter } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import {  toast } from 'react-toastify';


import { StateNewCategoria } from "./VariablesState";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class NewCategoria extends Component {
  state = JSON.parse(JSON.stringify(StateNewCategoria))

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
      ...this.state.newCategoriaForm
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
      newCategoriaForm: updatedOrderForm,
      formIsValid: formIsValidAlt

    })

  }


  handleSubmitNewCategoria = (event) => {
    event.preventDefault();
    Database.post('/insert-categorias', {
      codigo: event.target[0].value,
      descripcion: event.target[1].value
    },this)
      .then(res => {

          this.props.getCategorias();

          toast.success("Nueva categoria creada");
          this.resetForm();

      },err => {
        toast.error(err.message);
      })
  }

resetForm = () => {
  let newCategoriaForm = { ...this.state.newCategoriaForm };
  for(let key in newCategoriaForm) {
    newCategoriaForm[key].value = ''
  }
  this.setState({
    newCategoriaForm:newCategoriaForm
  })

}

  render() {
    const formElementsArray = [];
    for (let key in this.state.newCategoriaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newCategoriaForm[key]
      });
    }
    return (
      <form onSubmit={(event) => {
        this.handleSubmitNewCategoria(event)

      }}>

        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >Nueva Categoria</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Formulario alta de Categoria
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
            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/categorias')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Guardar</Button>

          </CardBody>
        </Card>
      </ form>
    );
  }
}


export default withRouter(withStyles(styles)(NewCategoria));
