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
import SnackbarContent from "components/Snackbar/SnackbarContent.js";


class NewInsumos extends Component {
    state = {
         insumos: [],
         actions: [],
         orderForm:{
          nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Nombre',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
          username: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  label: 'usuario',
                  fullWidth: true
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          password: {
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  label: 'constraseña',
                  fullWidth: true
              },
              value: '',
              validation: {
                minLength:5,
                  required: true,
      
              },
              valid: false,
              touched: false
          },
          tipoUser: {
              elementType: 'select',
              elementConfig: {
                  label:'Tipo de usuario',
                   options: [
      
                  ],
                  fullWidth: true
              },
              value: '',
              validation: {
                  required:true
              },
      
              valid: false,
              touched: false
          },
          descripcion: {
              elementType: 'textarea',
              elementConfig: {
                  type: 'text',
                  label:'Descripción',
                  rows:4
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
      
      

         },
        formIsValid:false
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
              isValid = value.length <= rules.maxLength ;
              textValid = 'Supera el maximo de caracteres';
          }
  
          return {isValid:isValid,textValid:textValid};
      }
  
      inputChangedHandler = (event, inputIdentifier) => {
          let checkValid;
          const updatedOrderForm = {
              ...this.state.orderForm
          };
          const updatedFormElement = {
              ...updatedOrderForm[inputIdentifier]
          };
          updatedFormElement.value = event.target.value;
          checkValid =  this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
          updatedFormElement.valid = checkValid.isValid;
          updatedFormElement.textValid = checkValid.textValid;
          updatedFormElement.touched = true;
          updatedOrderForm[inputIdentifier] = updatedFormElement;
  
          let formIsValidAlt = true;
          for (let inputIdentifier in updatedOrderForm) {
              formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
          }
          this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValidAlt

          })
         
      }
    

    render() {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }
        return (
     <Card>
    <CardHeader color="primary">
      <h4 >Nuevo Usuario</h4>
      <p >
        Formulario de un usuario nuevo
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


    </CardBody>
    </Card>
        );
    }
}


export default NewInsumos;


/*
import React from 'react';
import Input from 'components/Input/Input';
import { Route, Switch ,Link, withRouter} from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";



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

const useStyles = makeStyles(styles);

const NewInsumo = ( props ) =>
{
  const classes = useStyles();
    const formElementsArray = [];
        for (let key in props.orderForm) {
            formElementsArray.push({
                id: key,
                config: props.orderForm[key]
            });
        }

        React.useEffect(() => {
                props.resetNewForm(true);
        }, []);


return (

  <form onSubmit={(event) => {
    props.handleSubmitNewUser(event)

 }}>





  <Card>
    <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>Nuevo Usuario</h4>
      <p className={classes.cardCategoryWhite}>
        Formulario de un usuario nuevo
      </p>
    </CardHeader>
    <CardBody>
      { props.successSubmit &&
            <SnackbarContent
                message={
                'El usuario se ha guardado con éxito'
                }
                close
                color="success"
                />
      }
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
                      changed={(event) => props.inputChangedHandler(event, formElement.id)}
                       />
              ))}
              </div>

                      <Button style={{ marginTop:'25px'}} color="info" onClick={()=> props.history.push('/admin/usuarios')} ><ArrowBack />Volver</Button><Button style={{ marginTop:'25px'}} color="primary"  disabled={!props.formIsValid} type="submit" ><Save /> Guardar</Button>
        </CardBody>
        </Card>

  </ form>


)};

export default withRouter(NewInsumo);
*/
