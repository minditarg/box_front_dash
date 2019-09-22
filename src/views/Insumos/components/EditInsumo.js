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

const EditInsumo = ( props ) =>
{
  const classes = useStyles();
    const formElementsArray = [];
      for (let key in props.editInsumoForm) {
          formElementsArray.push({
              id: key,
              config: props.editInsumoForm[key]
          });
      }

      React.useEffect(() => {
              props.getInsumoEdit(props.match.params.idinsumo);
              return () => {
                props.resetEditForm();
                props.reloadInsumos();
              }
      }, []);



return (

  <form onSubmit={(event) => {
    props.handleSubmitEditInsumo(event)

 }}>


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
                      changed={(event) => props.inputEditChangedHandler(event, formElement.id)}
                       />
              ))}
              </div>

                      <Button style={{ marginTop:'25px'}} color="info" onClick={()=> props.history.push('/admin/insumos')} ><ArrowBack />Volver</Button><Button style={{ marginTop:'25px'}} color="primary"  disabled={!props.editFormIsValid} type="submit" ><Save /> Guardar</Button>


        </CardBody>
        </Card>


  </ form>


)};

export default withRouter(EditInsumo);
