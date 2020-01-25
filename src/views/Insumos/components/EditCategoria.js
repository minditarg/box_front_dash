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
import { StateEditCategoria } from "../VariablesState";


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


class EditCategoria extends Component {
  state = JSON.parse(JSON.stringify(StateEditCategoria));

  getCategoriaEdit = (id) => {
    Database.get('/list-categorias/' + id,this)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              categoriaEdit: resultado.result[0]
            })

            let editCategoriaFormAlt = { ...this.state.editCategoriaForm };
            editCategoriaFormAlt.codigo.value = resultado.result[0].codigo;
            editCategoriaFormAlt.descripcion.value = resultado.result[0].descripcion;

            for (let key in editCategoriaFormAlt) {
              editCategoriaFormAlt[key].touched = true;
              editCategoriaFormAlt[key].valid = true;
            }
            this.setState({
              editCategoriaForm: editCategoriaFormAlt
            })
          }
          else {
            this.setState({
              categoriaEdit: null
            })
          }

      },err => {
        toast.error(err.message);
      })
  }

  handleSubmitEditCategoria = (event) => {

    event.preventDefault();
    Database.post(`/update-categorias`, { id: this.state.categoriaEdit.id, codigo: this.state.editCategoriaForm.codigo.value, descripcion: this.state.editCategoriaForm.descripcion.value },this)
      .then(res => {

          this.props.getCategorias();

          this.setState({
            editFormIsValid: false
          }, () => {
            toast.success("Los cambios se realizaron correctamente");
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
      ...this.state.editCategoriaForm
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
      editCategoriaForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }


  editSingleCategoria = value => {
    this.props.history.push(this.props.match.url + '/editarcategoria/' + value);
  }


  resetEditForm = () => {
    let editCategoriaFormAlt = { ...this.state.editCategoriaForm };
    for (let key in editCategoriaFormAlt) {
      editCategoriaFormAlt[key].value = ''
    }

    this.setState({
      editCategoriaForm: editCategoriaFormAlt,
      editFormIsValid: false
    })


  }


  componentDidMount() {
    this.getCategoriaEdit(this.props.match.params.idcategoria);

  }



  render() {
    const formElementsArray = [];
    for (let key in this.state.editCategoriaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editCategoriaForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditCategoria(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Categoria</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Detalles del Categoria
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/categorias')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditCategoria));
