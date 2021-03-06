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
  state = JSON.parse(JSON.stringify(StateEditInsumo));


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
          let formulario = { ...this.state.editInsumoForm }
          formulario.categoria.elementConfig.options = [...a];
          this.setState({
            editInsumoForm: formulario
          })

      },err => {
        toast.error(err.message);
      })
  }
  getInsumoEdit = (id) => {
    Database.get('/list-insumos/' + id,this)
      .then(resultado => {
          if (resultado.result.length > 0) {
            this.setState({
              insumoEdit: resultado.result[0]
            })

            let editInsumoFormAlt = { ...this.state.editInsumoForm };
            editInsumoFormAlt.categoria.value = resultado.result[0].id_insumos_categorias;
            editInsumoFormAlt.codigo.value = resultado.result[0].codigo;
            editInsumoFormAlt.numero.value = resultado.result[0].numero;
            editInsumoFormAlt.descripcion.value = resultado.result[0].descripcion;
            editInsumoFormAlt.unidad.value = resultado.result[0].unidad;
            editInsumoFormAlt.minimo.value = resultado.result[0].minimo;
            editInsumoFormAlt.alertar.value = resultado.result[0].alertar;
            editInsumoFormAlt.autorizar.value = resultado.result[0].autorizar;

            for (let key in editInsumoFormAlt) {
              editInsumoFormAlt[key].touched = true;
              editInsumoFormAlt[key].valid = true;
            }
            this.setState({
              editInsumoForm: editInsumoFormAlt
            })
          }
          else {
            this.setState({
              insumoEdit: null
            })
          }

      },err => {
        toast.error(err.message);
      })
  }

  handleSubmitEditInsumo = (event) => {

    event.preventDefault();
    let objetoUpdate = {
      id: this.state.insumoEdit.id,
      descripcion: this.state.editInsumoForm.descripcion.value,
      unidad: this.state.editInsumoForm.unidad.value,
      categoria: this.state.editInsumoForm.categoria.value,
      numero: this.state.editInsumoForm.numero.value,
      alertar: this.state.editInsumoForm.alertar.value,
      autorizar: this.state.editInsumoForm.autorizar.value,
      minimo: this.state.editInsumoForm.minimo.value
    }

   // alert(this.state.editInsumoForm.alertar.value);
  //  if (this.state.editInsumoForm.minimo.value != minimoAnt)
  //    objetoUpdate.minimo = this.state.editInsumoForm.minimo.value;


    Database.post(`/update-insumos`, objetoUpdate,this)
      .then(res => {

          toast.success("Los cambios se realizaron correctamente");
          this.props.getInsumos();
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




  inputEditChangedHandler = (event, inputIdentifier, newValue) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editInsumoForm
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
    if (inputIdentifier == "categoria") {
      //alert(event.target.value); //el idInsumoCategoria


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
                    editInsumoForm: updatedOrderForm,
                    formIsValid: formIsValidAlt

                  })

              },err => {
                toast.error(err.message);
              })

            this.setState({
              editInsumoForm: updatedOrderForm,
              formIsValid: formIsValidAlt

            })


        }, err => {
          toast.error(err.message);
        })
    }
    else {
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
        console.log("cambiando autorizar: " + newValue);
        if(newValue == true)
          updatedOrderForm["autorizar"].value = 1;
        else
          updatedOrderForm["autorizar"].value = 0;
      }
      console.log(updatedOrderForm);
      this.setState({
        editInsumoForm: updatedOrderForm,
        formIsValid: formIsValidAlt

      })
    }

  }


  editSingleInsumo = value => {
    this.props.history.push(this.props.match.url + '/editarinsumo/' + value);
  }


  resetEditForm = () => {
    let editInsumoFormAlt = { ...this.state.editInsumoForm };
    for (let key in editInsumoFormAlt) {
      editInsumoFormAlt[key].value = ''
    }

    this.setState({
      editInsumoForm: editInsumoFormAlt,
      editFormIsValid: false
    })


  }


  componentDidMount() {
    this.getInsumoEdit(this.props.match.params.idinsumo);
    this.getCategorias();
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
                  changed={(event,newValue) => this.inputEditChangedHandler(event, formElement.id, newValue)}
                  />
              ))}
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/insumos')} ><ArrowBack />Volver</Button><Button disabled={this.state.disableAllButtons} style={{ marginTop: '25px' }} color="primary" variant="contained" type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditInsumo));
