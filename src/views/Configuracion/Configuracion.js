import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import { StateEditConfiguracion as StateEditConfiguracion } from "./VariablesState";


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

var minimoAnt = null;

class Configuracion extends Component {
  state = JSON.parse(JSON.stringify(StateEditConfiguracion));
  
  getConfiguracionEdit = (id) => {
    axios.get('/list-configuraciones/')
      .then(resultado => {
        if (resultado.data.success == 1) {
          if (resultado.data.result.length > 0) {
            this.setState({
              configuracionEdit: resultado.data.result[0]
            })
            minimoAnt = resultado.data.result[0].minimo;
            let editConfiguracionFormAlt = { ...this.state.editConfiguracionForm };
            //alert(resultado.data.result[0].valor);
            editConfiguracionFormAlt.alertaCosto.value = resultado.data.result[0].valor;

            for (let key in editConfiguracionFormAlt) {
              editConfiguracionFormAlt[key].touched = true;
              editConfiguracionFormAlt[key].valid = true;
            }
            this.setState({
              editConfiguracionForm: editConfiguracionFormAlt
            })
          }
          else {
            this.setState({
              configuracionEdit: null
            })
          }
        }
      })
  }

  handleSubmitEditConfiguracion = (event) => {

    event.preventDefault();
    let objetoUpdate = {
      id: this.state.configuracionEdit.id,
      alertaCosto: this.state.editConfiguracionForm.alertaCosto.value

    }
    axios.post(`/update-configuracion`, objetoUpdate)
      .then(res => {
        let estadoAlt = null
        if (res.data.success == 0) {
          estadoAlt = false
        }
        if (res.data.success == 1) {
          estadoAlt = true
        }

        if (estadoAlt) {
          toast.success("Configuracion actualizada correctamente");
       //   this.props.getConfiguracionEdit();
          this.setState({
            editFormIsValid: false
          })

        }
      })

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




  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editConfiguracionForm
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
      console.log(updatedOrderForm);
      this.setState({
        editConfiguracionForm: updatedOrderForm,
        formIsValid: formIsValidAlt

      })
  }


  // editSingleCosto = value => {
  //   this.props.history.push(this.props.match.url + '/editarcosto/' + value);
  // }


  // resetEditForm = () => {
  //   let editCostoFormAlt = { ...this.state.editCostoForm };
  //   for (let key in editCostoFormAlt) {
  //     editCostoFormAlt[key].value = ''
  //   }

  //   this.setState({
  //     editCostoForm: editCostoFormAlt,
  //     editFormIsValid: false
  //   })


  // }


  componentDidMount() {
    this.getConfiguracionEdit(this.props.match.params.idconfiguracion);
   // this.getCategorias();
  }



  render() {
    const formElementsArray = [];
    for (let key in this.state.editConfiguracionForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editConfiguracionForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditConfiguracion(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Configuracion</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Configuracion de la Aplicación
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
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
                  changed={(event) => this.inputEditChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>

            {/* <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/configuracion')} ><ArrowBack />Volver</Button> */}
            <Button style={{ marginTop: '25px' }} color="primary" type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(Configuracion));
