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
import { StateEditInsumo } from "../VariablesState";


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


class EditInsumo extends Component {
state= JSON.parse(JSON.stringify(StateEditInsumo));

    getInsumoEdit = (id) => {
        axios.get('/list-insumos/' + id)
              .then(resultado => {
                  if(resultado.data.success == 1) {
                      if(resultado.data.result.length > 0) {
                        this.setState({
                          insumoEdit:resultado.data.result[0]
                        })

                        let editInsumoFormAlt = {...this.state.editInsumoForm};
                          editInsumoFormAlt.codigo.value = resultado.data.result[0].codigo;
                          editInsumoFormAlt.descripcion.value = resultado.data.result[0].descripcion;
                          editInsumoFormAlt.unidad.value = resultado.data.result[0].unidad;
                          editInsumoFormAlt.minimo.value = resultado.data.result[0].minimo;

                          for(let key in editInsumoFormAlt){
                            editInsumoFormAlt[key].touched = true;
                            editInsumoFormAlt[key].valid = true;
                          }
                          this.setState({
                            editInsumoForm:editInsumoFormAlt
                          })
                      }
                        else
                    {
                      this.setState({
                        insumoEdit:null
                      })
                    }
                  }
              })
      }

      handleSubmitEditInsumo = (event) => {

          event.preventDefault();
          axios.post(`/update-insumos`, { id:this.state.insumoEdit.id,codigo: this.state.editInsumoForm.codigo.value, descripcion: this.state.editInsumoForm.descripcion.value, unidad: this.state.editInsumoForm.unidad.value, minimo: this.state.editInsumoForm.minimo.value})
              .then(res => {
                  let estadoAlt = null
                  if (res.data.success == 0) {
                      estadoAlt = false
                  }
                  if (res.data.success == 1) {
                      estadoAlt = true
                  }

                  if(estadoAlt){
                    this.props.getInsumos();
                    this.setState({
                      editFormIsValid:false
                    })
                    toast.success("Los cambios se realizaron correctamente");
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
              isValid = value.length <= rules.maxLength ;
              textValid = 'Supera el maximo de caracteres';
          }

          return {isValid:isValid,textValid:textValid};
      }




      inputEditChangedHandler = (event, inputIdentifier) => {
          let checkValid;
          const updatedOrderForm = {
              ...this.state.editInsumoForm
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
            editInsumoForm:updatedOrderForm,
            editFormIsValid:formIsValidAlt
          })

      }


      editSingleInsumo = value => {
      this.props.history.push(this.props.match.url + '/editarinsumo/' + value);
      }


      resetEditForm = ()=> {
      let editInsumoFormAlt = {...this.state.editInsumoForm};
        for(let key in editInsumoFormAlt){
          editInsumoFormAlt[key].value = ''
        }

        this.setState({
          editInsumoForm:editInsumoFormAlt,
          editFormIsValid:false
        })


      }


      componentDidMount() {
        this.getInsumoEdit(this.props.match.params.idinsumo);

      }



  render() {
    const formElementsArray = [];
    for (let key in this.state.editInsumoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editInsumoForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditInsumo(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Insumo</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Detalles del Insumo
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/insumos')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.editFormIsValid} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditInsumo));
