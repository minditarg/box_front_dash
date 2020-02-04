import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Database from "variables/Database.js";
import { toast } from 'react-toastify';

import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import { StateEditCosto } from "../VariablesState";


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

class EditCosto extends Component {
  state = JSON.parse(JSON.stringify(StateEditCosto));


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
          let formulario = { ...this.state.editCostoForm }
          formulario.categoria.elementConfig.options = [...a];
          this.setState({
            editCostoForm: formulario
          })

      },err => {
        toast.error(err.message);
      })
  }
  getCostoEdit = (id) => {
    Database.get('/list-insumos/' + id,this)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              costoEdit: resultado.result[0]
            })
            minimoAnt = resultado.result[0].minimo;
            let editCostoFormAlt = { ...this.state.editCostoForm };
            editCostoFormAlt.codigo.value = resultado.result[0].codigo;
            editCostoFormAlt.numero.value = resultado.result[0].numero;
            editCostoFormAlt.descripcion.value = resultado.result[0].descripcion;
            editCostoFormAlt.unidad.value = resultado.result[0].unidad;
           // editCostoFormAlt.minimo.value = resultado.data.result[0].minimo;
            editCostoFormAlt.costo.value = resultado.result[0].costo;

            for (let key in editCostoFormAlt) {
              editCostoFormAlt[key].touched = true;
              editCostoFormAlt[key].valid = true;
            }
            this.setState({
              editCostoForm: editCostoFormAlt
            })
          }
          else {
            this.setState({
              costoEdit: null
            })
          }

      },err => {
        toast.error(err.message);
      })
  }

  handleSubmitEditCosto = (event) => {

    event.preventDefault();
    let objetoUpdate = {
      id: this.state.costoEdit.id,
      costo: this.state.editCostoForm.costo.value

    }

    Database.post(`/update-insumos-costos`, objetoUpdate,this)
      .then(res => {


          toast.success("El costo del insumo se actualizó correctamente");
          this.props.getCostos();
          this.setState({
            editFormIsValid: false
          })


      },err => {
        toast.error(err.message);
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
      ...this.state.editCostoForm
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
    if (inputIdentifier == "categoria") {
      //alert(event.target.value); //el idCostoCategoria


      Database.get('/list-categorias/' + event.target.value,this)
        .then(res => {

            let resultado = [...res.result];

            updatedOrderForm["codigo"].value = resultado[0].codigo;
            updatedOrderForm["codigo"].valid = true;
            updatedOrderForm["codigo"].touched = true;

            Database.get('/get-siguiente/' + resultado[0].id,this)
              .then(res => {

                  let siguiente = null;
                  if (res.result[0].siguiente)
                    siguiente = res.result[0].siguiente;
                  else
                    siguiente = 1;

                    // alert('/list-categorias');
                    updatedOrderForm["numero"].value = siguiente;
                  updatedOrderForm["numero"].valid = true;
                  updatedOrderForm["numero"].touched = true;

                  this.setState({
                    editCostoForm: updatedOrderForm,
                    formIsValid: formIsValidAlt

                  })

              },err => {
                toast.error(err.message);
              })

            this.setState({
              editCostoForm: updatedOrderForm,
              formIsValid: formIsValidAlt

            })


        }, err => {
          toast.error(err.message);
        })
    }
    else {
      console.log(updatedOrderForm);
      this.setState({
        editCostoForm: updatedOrderForm,
        formIsValid: formIsValidAlt

      })
    }

  }


  editSingleCosto = value => {
    this.props.history.push(this.props.match.url + '/editarcosto/' + value);
  }


  resetEditForm = () => {
    let editCostoFormAlt = { ...this.state.editCostoForm };
    for (let key in editCostoFormAlt) {
      editCostoFormAlt[key].value = ''
    }

    this.setState({
      editCostoForm: editCostoFormAlt,
      editFormIsValid: false
    })


  }


  componentDidMount() {
    this.getCostoEdit(this.props.match.params.idcosto);
   // this.getCategorias();
  }



  render() {
    const formElementsArray = [];
    for (let key in this.state.editCostoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editCostoForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditCosto(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Costo</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Detalles del Costo
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/costos')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditCosto));
