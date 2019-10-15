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
import { StateEditPlantilla } from "../VariablesState";


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


class EditPlantilla extends Component {
state= JSON.parse(JSON.stringify(StateEditPlantilla));


getCategorias = () => {
  axios.get('/list-categorias')
    .then(res => {
      if (res.data.success == 1) {
        let resultadoCategorias = [...res.data.result];
        let a = [];
        resultadoCategorias.forEach(function (entry) {
        //  alert(entry.codigo);
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.editPlantillaForm }
        formulario.categoria.elementConfig.options = [...a];
        this.setState({
          editPlantillaForm: formulario
        })
      }
    })
}
    getPlantillaEdit = (id) => {
        axios.get('/list-plantillas/' + id)
              .then(resultado => {
                  if(resultado.data.success == 1) {
                      if(resultado.data.result.length > 0) {
                        this.setState({
                          plantillaEdit:resultado.data.result[0]
                        })

                        let editPlantillaFormAlt = {...this.state.editPlantillaForm};
                          editPlantillaFormAlt.codigo.value = resultado.data.result[0].codigo;
                          editPlantillaFormAlt.numero.value = resultado.data.result[0].numero;
                          editPlantillaFormAlt.descripcion.value = resultado.data.result[0].descripcion;
                          editPlantillaFormAlt.unidad.value = resultado.data.result[0].unidad;
                          editPlantillaFormAlt.minimo.value = resultado.data.result[0].minimo;

                          for(let key in editPlantillaFormAlt){
                            editPlantillaFormAlt[key].touched = true;
                            editPlantillaFormAlt[key].valid = true;
                          }
                          this.setState({
                            editPlantillaForm:editPlantillaFormAlt
                          })
                      }
                        else
                    {
                      this.setState({
                        plantillaEdit:null
                      })
                    }
                  }
              })
      }

      handleSubmitEditPlantilla = (event) => {

          event.preventDefault();
          axios.post(`/update-plantillas`, { 
            id:this.state.plantillaEdit.id,
            codigo: this.state.editPlantillaForm.codigo.value, 
            descripcion: this.state.editPlantillaForm.descripcion.value, 
            unidad: this.state.editPlantillaForm.unidad.value, 
            minimo: this.state.editPlantillaForm.minimo.value,
            categoria: this.state.editPlantillaForm.categoria.value,
            numero: this.state.editPlantillaForm.numero.value
          })
              .then(res => {
                  let estadoAlt = null
                  if (res.data.success == 0) {
                      estadoAlt = false
                  }
                  if (res.data.success == 1) {
                      estadoAlt = true
                  }

                  if(estadoAlt){
                    this.props.getPlantillas();
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
              ...this.state.editPlantillaForm
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
          if(inputIdentifier == "categoria")
          {
           //alert(event.target.value); //el idPlantillaCategoria
      
      
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
                   updatedOrderForm["numero"].value = res.data.result[0].siguiente;
                   updatedOrderForm["numero"].valid = true;
                   updatedOrderForm["numero"].touched = true;
      
                   this.setState({
                    editPlantillaForm: updatedOrderForm,
                    formIsValid: formIsValidAlt
      
                  })
                  }
                })
      
                this.setState({
                  editPlantillaForm: updatedOrderForm,
                  formIsValid: formIsValidAlt
      
                })
      
              } else if (res.data.success == 3 || res.data.success == 4) {
              }
            }, err => {
              toast.error(err.message);
            })
          }
          else{
              console.log(updatedOrderForm);
              this.setState({
              editPlantillaForm: updatedOrderForm,
              formIsValid: formIsValidAlt
      
            })
          }

      }


      editSinglePlantilla = value => {
      this.props.history.push(this.props.match.url + '/editarplantilla/' + value);
      }


      resetEditForm = ()=> {
      let editPlantillaFormAlt = {...this.state.editPlantillaForm};
        for(let key in editPlantillaFormAlt){
          editPlantillaFormAlt[key].value = ''
        }

        this.setState({
          editPlantillaForm:editPlantillaFormAlt,
          editFormIsValid:false
        })


      }


      componentDidMount() {
        this.getPlantillaEdit(this.props.match.params.idplantilla);
        this.getCategorias();
      }



  render() {
    const formElementsArray = [];
    for (let key in this.state.editPlantillaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editPlantillaForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditPlantilla(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Plantilla</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Detalles del Plantilla
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/plantillas')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditPlantilla));
