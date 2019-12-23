import React, { Component } from "react";
import axios from "axios";
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

import { toast } from 'react-toastify';

import { StateNewPedido } from "./VariablesState";
import { truncate } from "fs";


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

class NewPedido extends Component {
  state = JSON.parse(JSON.stringify(StateNewPedido))

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


  inputChangedHandler = (event, inputIdentifier,newValue) => {
  //  alert(inputIdentifier);
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newPedidoForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    console.log(newValue);
    if(newValue)
      updatedFormElement.value = newValue;
    else
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

    if(inputIdentifier == "categoria")
    {
  //   alert(event.target.value); //el idPedidoCategoria


          axios.get('/list-categorias/' + event.target.value)
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          console.log(updatedOrderForm);
          console.log(resultado[0].codigo);
          console.log(resultado[0].siguiente);
          updatedOrderForm["codigo"].value = resultado[0].codigo;
          updatedOrderForm["codigo"].valid = true;
          updatedOrderForm["codigo"].touched = true;

          axios.get('/get-siguiente/' + resultado[0].id)
          .then(res => {
            if (res.data.success == 1) {
              console.log(res.data.result[0].siguiente);
             // alert('/list-categorias');
             if(res.data.result[0].siguiente == null)
                updatedOrderForm["numero"].value = 1;
             else 
                updatedOrderForm["numero"].value = res.data.result[0].siguiente;
                
             updatedOrderForm["numero"].valid = true;
             updatedOrderForm["numero"].touched = true;

             this.setState({
              newPedidoForm: updatedOrderForm,
              formIsValid: formIsValidAlt

            })
            }
          })

          this.setState({
            newPedidoForm: updatedOrderForm,
            formIsValid: formIsValidAlt

          })

        } else if (res.data.success == 3 || res.data.success == 4) {
        }
      }, err => {
        toast.error(err.message);
      })
    } 
    else{
      if(inputIdentifier == "alertar")
      {
        console.log("cambiando alerta: " + newValue);
        if(newValue == true)
          updatedOrderForm["alertar"].value = 1;
        else
          updatedOrderForm["alertar"].value = 0;
      }

      if(inputIdentifier == "autorizar")
      {
        console.log("cambiando autorizacion: " + newValue);
        if(newValue == true)
          updatedOrderForm["autorizar"].value = 1;
        else
          updatedOrderForm["autorizar"].value = 0;
      }
        console.log(updatedOrderForm);
        this.setState({
        newPedidoForm: updatedOrderForm,
        formIsValid: formIsValidAlt

      })
    }

  }


  handleSubmitNewPedido = (event) => {
    event.preventDefault();
    if(this.state.formIsValid) {
    axios.post('/insert-pedidos', {

      
      numero: this.state.newPedidoForm.numero.value,
      descripcion: this.state.newPedidoForm.descripcion.value,
      unidad: this.state.newPedidoForm.unidad.value,
      minimo: this.state.newPedidoForm.minimo.value,
      categoria: this.state.newPedidoForm.categoria.value,
      alertar: this.state.newPedidoForm.alertar.value,
      autorizar: this.state.newPedidoForm.autorizar.value
    })
      .then(res => {
        if (res.data.success == 1) {
          this.props.getPedidos();
          toast.success("Nuevo pedido creado");
          this.resetForm();
        }
        else {
          console.log(res);
          toast.error(res.data.error_msj);
        }
      })
    }
  }

resetForm = () => {
  let newPedidoForm = { ...this.state.newPedidoForm };
  for(let key in newPedidoForm) {
    newPedidoForm[key].value = ''
  }
  this.setState({
    newPedidoForm:newPedidoForm
  })

}

componentDidMount() {

 // this.getCategorias();
}

  render() {
    const formElementsArray = [];
    for (let key in this.state.newPedidoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newPedidoForm[key]
      });
    }
    return (
      <form onSubmit={(event) => {
        this.handleSubmitNewPedido(event)

      }}>

        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >Nuevo Pedido</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Formulario alta de Pedido
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
                changed={(event,newValue) => this.inputChangedHandler(event, formElement.id,newValue)}
              />
            ))}

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/pedidos')} ><ArrowBack />Volver</Button> <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Guardar</Button>

          </CardBody>
        </Card>
      </ form>
    );
  }
}


export default withRouter(withStyles(styles)(NewPedido));
