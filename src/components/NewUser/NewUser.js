import React from 'react';
import Input from '../Input/Input';

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles(styles);

const NewUser = ( props ) =>
{
  const classes = useStyles();
    const formElementsArray = [];
        for (let key in props.orderForm) {
            formElementsArray.push({
                id: key,
                config: props.orderForm[key]
            });
        }
return (

  <form onSubmit={ props.handleSubmitNewUser }>





  <Card>
    <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>Nuevo Usuario</h4>
      <p className={classes.cardCategoryWhite}>
        Formulario de un usuario nuevo
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
                      changed={(event) => props.inputChangedHandler(event, formElement.id)}
                       />
              ))}
              </div>

                      <Button style={{ marginTop:'25px'}} color="info" ><ArrowBack />Volver</Button><Button style={{ marginTop:'25px'}} color="primary"  disabled={!props.formIsValid} type="submit" ><Save /> Guardar</Button>


        </CardBody>
        </Card>







  </ form>


)};

export default NewUser;
