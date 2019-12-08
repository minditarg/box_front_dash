import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewConfiguracion } from "./VariablesState";

import axios from "axios";

import { toast } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';



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


class Configuracion extends Component {
  state =JSON.parse(JSON.stringify(StateNewConfiguracion));


  handleSubmitNewConfiguracion = (event) => {
    event.preventDefault();
    this.setState({
      disableAllButtons:true
    })
    axios.post("/update-configuracion", {alertaCosto: this.state.newConfiguracionForm.alertaCosto.value})
      .then(res => {
        let estadoAlt = null

        if (res.data.success == 1) {
          estadoAlt = true
        } else {
          estadoAlt = false
        }
        if (estadoAlt) {
          toast.success("La configuracion se ha actualizado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
            disableAllButtons:false
          },()=>{
              this.props.getConfiguraciones();
          })
          this.resetNewForm();

        } else {
          toast.error(res.data.error_msj);
          this.setState({
            disableAllButtons:false
          })
        }
      },err => {
        toast.error(err.message);
        this.setState({
          disableAllButtons:false
        })

      })
  }


  getConfiguraciones = () => {
    axios.get('/list-configuraciones')
      .then(res => {
        if (res.data.success == 1) {
          let formulario = { ...this.state.newConfiguracionForm }
          this.setState({
            newConfiguracionForm: formulario
          })
        }
      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newConfiguracionForm
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
      newConfiguracionForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newConfiguracionFormAlt = { ...this.state.newConfiguracionForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newConfiguracionFormAlt) {
      newConfiguracionFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    this.getConfiguraciones("new", newConfiguracionFormAlt);

  }

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

  componentDidMount() {

    this.getConfiguraciones();
  }



  render() {

    const formElementsArray = [];
    for (let key in this.state.newConfiguracionForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newConfiguracionForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewConfiguracion(event)

      } }>

        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Configuraciones</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Configuraciones generales del sistema
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editConfiguracion-" + formElement.id}
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
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/usuarios')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(Configuracion));
