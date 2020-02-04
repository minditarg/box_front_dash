import React, { Component } from "react";
import Database from "variables/Database.js"
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
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import { toast } from 'react-toastify';

import { StateNewInsumo } from "./VariablesState";
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

class NewInsumo extends Component {
  state = JSON.parse(JSON.stringify(StateNewInsumo))



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

  getCategorias = () => {
    Database.get('/list-categorias',this)
      .then(res => {

          let resultadoCategorias = [...res.result];
          let a = [];
          resultadoCategorias.forEach(function (entry) {
          //  alert(entry.codigo);
            a.push({
              value: entry.id,
              displayValue: entry.descripcion
            });
          })
          let formulario = { ...this.state.newInsumoForm }
          formulario.categoria.elementConfig.options = [...a];
          this.setState({
            newInsumoForm: formulario
          })

      },err => {
        toast.error(err.message);
      })
  }

  inputChangedHandler = (event, inputIdentifier,newValue) => {
  //  alert(inputIdentifier);
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newInsumoForm
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
  //   alert(event.target.value); //el idInsumoCategoria


          Database.get('/list-categorias/' + event.target.value,this)
      .then(res => {

          let resultado = [...res.result];
          console.log(updatedOrderForm);
          console.log(resultado[0].codigo);
          console.log(resultado[0].siguiente);
          updatedOrderForm["codigo"].value = resultado[0].codigo;
          updatedOrderForm["codigo"].valid = true;
          updatedOrderForm["codigo"].touched = true;

          Database.get('/get-siguiente/' + resultado[0].id,this)
          .then(res => {
              console.log(res.result[0].siguiente);
             // alert('/list-categorias');
             if(res.result[0].siguiente == null)
                updatedOrderForm["numero"].value = 1;
             else
                updatedOrderForm["numero"].value = res.result[0].siguiente;

             updatedOrderForm["numero"].valid = true;
             updatedOrderForm["numero"].touched = true;

             this.setState({
              newInsumoForm: updatedOrderForm,
              formIsValid: formIsValidAlt

            })

          })

          this.setState({
            newInsumoForm: updatedOrderForm,
            formIsValid: formIsValidAlt

          })


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
        newInsumoForm: updatedOrderForm,
        formIsValid: formIsValidAlt

      })
    }

  }


  handleSubmitNewInsumo = (event) => {
    event.preventDefault();
    if(this.state.formIsValid) {
    Database.post('/insert-insumos', {


      numero: this.state.newInsumoForm.numero.value,
      descripcion: this.state.newInsumoForm.descripcion.value,
      unidad: this.state.newInsumoForm.unidad.value,
      minimo: this.state.newInsumoForm.minimo.value,
      categoria: this.state.newInsumoForm.categoria.value,
      alertar: this.state.newInsumoForm.alertar.value,
      autorizar: this.state.newInsumoForm.autorizar.value
    },this)
      .then(res => {

          this.props.getInsumos();
          toast.success("Nuevo insumo creado");
          this.resetForm();

      },err => {
        toast.error(err.message);
      })
    }
  }

resetForm = () => {
  let newInsumoForm = { ...this.state.newInsumoForm };
  for(let key in newInsumoForm) {
    newInsumoForm[key].value = ''
  }
  this.setState({
    newInsumoForm:newInsumoForm,
    formIsValid:false,
  })

}

componentDidMount() {

  this.getCategorias();
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
            <h4 className={this.props.classes.cardTitleWhite} >Nuevo Insumo</h4>
            <p className={this.props.classes.cardCategoryWhite} >
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
                changed={(event,newValue) => this.inputChangedHandler(event, formElement.id,newValue)}
              />
            ))}

            <Button style={{ marginTop: '25px' }} variant="contained" color="info" onClick={() => this.props.history.push('/admin/insumos')} ><ArrowBack />Volver</Button> <Button style={{ marginTop: '25px' }} variant="contained" color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>

          </CardBody>
        </Card>
      </ form>
    );
  }
}


export default withRouter(withStyles(styles)(NewInsumo));
