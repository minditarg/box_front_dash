import React, { Component } from "react";
import axios from "axios";

import { Route, Switch ,Link} from 'react-router-dom';
// core components

import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import ListUsers from "./components/ListUsers";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";




class Users extends Component {
    state = {
        users:[],
        userEdit:null,
        checked:[],
        menuContext:null,
        botonesAcciones: {
          nuevo: {

            enabled: true,
            texto: 'Nuevo'
          },
          editar: {

            enabled: false,
            texto: 'Editar'
          },
          delete: {

            enabled: false,
            texto: 'Eliminar'
          }
        },
        modalOpen:false,
        newUserForm:{
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
        editUserForm:{
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
        formIsValid: false,
        editFormIsValidConst: false,
        successSubmitConst: null,
        successSubmitEditConst: null,
        actionUpdateUsersConst: false

    };


      componentDidMount() {
        this.getUsersAdmin();

      }


////////////////////////
////////////////////////
//METODOS PARA MENU CONTEXTUAL
////////////////////////
////////////////////////

      handleToggle = value => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];
        let deleteEnabled = false;
        let editEnabled = false;
        const botonesAcc = { ...this.state.botonesAcciones }
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        if (newChecked.length > 0) {
          deleteEnabled = true;
          if (newChecked.length == 1)
            editEnabled = true;
        }
        botonesAcc.editar.enabled = editEnabled;
        botonesAcc.delete.enabled = deleteEnabled;
        this.setState({
          botonesAcciones:botonesAcc,
          checked:newChecked
        })

      };

      menuHandleClose = (value) => {
        this.setState({
          menuContext:null
        })
      }

      menuHandleItemClick = (value) => {
        const newItem = { ...this.state.botonesAcciones[value] };
        let menuContext = {...this.state.menuContext};
        if (newItem.enabled) {
            menuContext= null;

          if(value == 'nuevo') {
            this.setState({
              successSubmit:false,
              menuContext:menuContext,
              formIsValid:false
            })
            this.resetNewForm();
          this.props.history.push(this.props.match.url + '/nuevousuario');
        }

        if(value == 'editar' && this.state.checked.length == 1) {
           this.setState({
              menuContext:menuContext
            })
          let idUser = this.state.checked[0].id;
          this.props.history.push(this.props.match.url + '/editarusuario/' + idUser);
        }
        }
      }

      menuHandleOpen = event => {
        this.setState({
          menuContext:event.currentTarget
        })
      }
      ////////////////////////
      ////////////////////////
      //METODOS PARA LISTADO DE USUARIOS
      ////////////////////////
      ////////////////////////
      getUsersAdmin = () => {

        axios.get('/list-users')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                users:resultado,
                checked:[],
                menuContext:null,
                botonesAcciones:{
                  nuevo: {
                    enabled: true,
                    texto: 'Nuevo'
                  },
                  editar: {
                    enabled: false,
                    texto: 'Editar'
                  },
                  delete: {
                    enabled: false,
                    texto: 'Eliminar'
                  }
                }
              })
            }
          })
        }
        ////////////////////////
        ////////////////////////
        //METODOS NUEVO USUARIO
        ////////////////////////
        ////////////////////////
        handleSubmitNewUser = (event) => {
            event.preventDefault();
            axios.post(`/signup-json`, { username: this.state.newUserForm.username.value, password: this.state.newUserForm.password.value,nombre:this.state.newUserForm.nombre.value,id_users_type:this.state.newUserForm.tipoUser.value})
                .then(res => {
                    let estadoAlt = null
                    if (res.data.success == 0) {
                        estadoAlt = false
                    }
                    if (res.data.success == 1) {
                        estadoAlt = true
                    }
                    if(estadoAlt){
                      this.setState({
                        successSubmit:true,
                        formIsValid:false,
                        actionUpdateUsers:true
                      })
                      this.resetNewForm();

                      }
                })
        }


        inputChangedHandler = (event, inputIdentifier) => {
            let checkValid;
            const updatedOrderForm = {
                ...this.state.newUserForm
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
              newUserForm:updatedOrderForm,
              formIsValid:formIsValidAlt
            })

        }

        resetNewForm = (all)=> {
        let newUserFormAlt = {...this.state.newUserForm};
        let successSubmit = this.state.successSubmit;
          for(let key in newUserFormAlt){
            newUserFormAlt[key].value = ''
          }
          if(all)
          successSubmit= false;

          this.setState({
            successSubmit:successSubmit,
            formIsValid:false
          })
          this.getUsersType("new",newUserFormAlt);

        }


        ////////////////////////
        ////////////////////////
        //METODOS EDICION DE USUARIOS
        ////////////////////////
        ////////////////////////

        getUserEdit = (id) => {
          axios.get('/list-users/' + id)
                .then(resultado => {
                    if(resultado.data.success == 1) {
                        if(resultado.data.result.length > 0) {
                          this.setState({
                            userEdit:resultado.data.result[0]
                          })

                          let editUserFormAlt = {...this.state.editUserForm};
                            editUserFormAlt.username.value = resultado.data.result[0].username;
                            editUserFormAlt.nombre.value = resultado.data.result[0].nombre;
                            editUserFormAlt.tipoUser.value = resultado.data.result[0].id_users_type.toString();
                            for(let key in editUserFormAlt){
                              editUserFormAlt[key].touched = true;
                              editUserFormAlt[key].valid = true;
                            }
                            this.getUsersType("edit",editUserFormAlt);
                        }
                          else
                      {
                        this.setState({
                          userEdit:null
                        })
                      }
                    }
                })
        }

        handleSubmitEditUser = (event) => {

            event.preventDefault();
            axios.post(`/update-user`, { id:this.state.userEdit.id,nombre: this.state.editUserForm.nombre.value, id_users_type: this.state.editUserForm.tipoUser.value})
                .then(res => {

                    let estadoAlt = null
                    if (res.data.success == 0) {
                        estadoAlt = false
                    }
                    if (res.data.success == 1) {
                        estadoAlt = true
                    }

                    if(estadoAlt){
                      this.setState({
                        successSubmitEdit:true,
                        editFormIsValid:false
                      })
                      }
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
              editUserForm:updatedOrderForm,
              editFormIsValid:formIsValidAlt
            })

        }


        editSingleUser = value => {
        this.props.history.push(this.props.match.url + '/editarusuario/' + value);
        }


        resetEditForm = (all)=> {
        let editUserFormAlt = {...this.state.editUserForm};
        let successSubmitEdit = this.state.successSubmitEdit;
          for(let key in editUserFormAlt){
            editUserFormAlt[key].value = ''
          }
          if(all)
          successSubmitEdit = false;

          this.setState({
            editFormIsValid:false,
            successSubmitEdit:successSubmitEdit
          })

          this.getUsersType("edit",editUserFormAlt);

        }
        ////////////////////////
        ////////////////////////
        //METODOS GENERALES
        ////////////////////////
        ////////////////////////

        reloadUsers = () => {
              this.getUsersAdmin();
            }

        getUsersType = (tipo,formulario) =>
        {
        axios.get('/list-users_type')
          .then(res => {
            if (res.data.success == 1) {
              let resultadoUserType = [...res.data.result];
              let a = [];
              resultadoUserType.forEach(function(entry){
                a.push({
                  value: entry.id,
                  displayValue: entry.desc
                });
              })

              if(tipo == 'new'){
                formulario.tipoUser.elementConfig.options=[...a];
                this.setState({
                  newUserForm:formulario
                })
              }

              if(tipo == 'edit') {
                formulario.tipoUser.elementConfig.options=[...a];
                this.setState({
                  editUserForm:formulario
                })
              }

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




    render() {
        return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

            <Switch>
                  <Route path={ this.props.match.url } exact  render={() =>

                    <ListUsers

                        menuContext={this.state.menuContext}
                        botonesAcciones={this.state.botonesAcciones}
                        users={this.state.users}
                        checked={this.state.checked}

                        menuHandleOpen={(event) => this.menuHandleOpen(event)}
                        menuHandleClose={(event) => this.menuHandleClose(event)}
                        menuHandleItemClick={(keyName) => this.menuHandleItemClick(keyName)}
                        handleToggle={(value) => this.handleToggle(value)}
                        editSingleUser={(value) => this.editSingleUser(value)}
                       reloadUsers={this.reloadUsers}


                    />



                  } />
                  <Route path={ this.props.match.url + "/nuevousuario"}  render={() =>

                   <NewUser
                   orderForm={this.state.newUserForm}
                   formIsValid={this.state.formIsValid}
                   successSubmit={this.state.successSubmit}

                   handleSubmitNewUser={(event) => {this.handleSubmitNewUser(event)}}
                   inputChangedHandler={ (event,inputIdentifier)=> this.inputChangedHandler(event,inputIdentifier)}
                   resetNewForm={this.resetNewForm}
                   reloadUsers={this.reloadUsers}

                 />}
                  />

                  <Route path={ this.props.match.url + "/editarusuario/:iduser"}  render={() =>

                   <EditUser
                   orderForm={this.state.editUserForm}
                   editFormIsValid={this.state.editFormIsValid}
                   successSubmitEdit={this.state.successSubmitEdit}


                   handleSubmitEditUser={(event) => {this.handleSubmitEditUser(event)}}
                   inputEditChangedHandler={ (event,inputIdentifier)=> this.inputEditChangedHandler(event,inputIdentifier)}
                   getUserEdit={(id) => { this.getUserEdit(id)}}
                   resetEditForm={this.resetEditForm}
                    reloadUsers={this.reloadUsers}

                 />}
                  />

              </Switch>


            </GridItem>
          </GridContainer>

        );
    }
}


export default Users;
