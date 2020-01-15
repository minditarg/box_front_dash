import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import { StateEditUser } from "../VariablesState";



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


class EditUser extends Component {
  state = JSON.parse(JSON.stringify(StateEditUser));


  getUsersType = () => {
    Database.get('/list-users_type',this)
      .then(res => {

          let resultadoUserType = [...res.result];
          let a = [];
          resultadoUserType.forEach(function (entry) {
            a.push({
              value: entry.id,
              displayValue: entry.desc
            });
          })


          let formulario = { ...this.state.editUserForm }
          formulario.tipoUser.elementConfig.options = [...a];
          this.setState({
            editUserForm: formulario
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


  getUserEdit = (id) => {
    Database.get('/list-users/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              userEdit: resultado.result[0]
            })

            let editUserFormAlt = { ...this.state.editUserForm };
            editUserFormAlt.username.value = resultado.result[0].username;
            editUserFormAlt.nombre.value = resultado.result[0].nombre;
            editUserFormAlt.tipoUser.value = resultado.result[0].id_users_type.toString();
            for (let key in editUserFormAlt) {
              editUserFormAlt[key].touched = true;
              editUserFormAlt[key].valid = true;
            }
            this.getUsersType("edit", editUserFormAlt);
          }
          else {
            this.setState({
              userEdit: null
            })
          }

      })
  }

  handleSubmitEditUser = (event) => {

    event.preventDefault();

    Database.post(`/update-user`, { id: this.props.match.params.iduser,username:this.state.editUserForm.username.value, nombre: this.state.editUserForm.nombre.value, id_users_type: this.state.editUserForm.tipoUser.value })
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El Usuario se ha modificado con exito!");

              this.props.getUsersAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editUserForm
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
      editUserForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editUserFormAlt = { ...this.state.editUserForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editUserFormAlt) {
      editUserFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

    this.getUsersType();
    this.getUserEdit(this.props.match.params.iduser);
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.editUserForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editUserForm[key]
      });
    }

    return (

      <form onSubmit={(event) => {
        this.handleSubmitEditUser(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Usuario</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del usuario
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"edituser-" + formElement.id}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/usuarios')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={3000}/>
      </ form>


    )
  }

};

export default withRouter(withStyles(styles)(EditUser));
