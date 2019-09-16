import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from 'react-router-dom';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from "axios";
import ListUsers from "../../components/ListUsers/ListUsers";
import NewUser from "../../components/NewUser/NewUser";



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


const usersAlt = [];
const checkedAlt = [];
const menuContextAlt = null;
const botonesAccionesAlt = {
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
};
const modalOpenAlt = false;
const newUserFormAlt = {
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
            placeholder: 'descripcion',
            fullWidth: true,
            rows:4
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },


};

const formIsValidAlt = false;




const useStyles = makeStyles(styles);

export default function Users(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState(usersAlt);
  const [checked, setChecked] = React.useState(checkedAlt);
  const [menuContext, setMenuContext] = React.useState(menuContextAlt);
  const [botonesAcciones, setBotonesAcciones] = React.useState(botonesAccionesAlt);
  const [modalOpen, setModalOpen] = React.useState(modalOpenAlt);
  const [newUserForm, setNewUserForm] = React.useState(newUserFormAlt);
  const [formIsValid, setFormIsValid] = React.useState(formIsValidAlt);

  const deleteUser = value => {

    const currentIndex = users.indexOf(value);
    const newUsers = [ ...users];

    newUsers.splice(currentIndex, 1);

    setUsers(newUsers);

  }

  const handleToggle = value => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    let deleteEnabled = false;
    let editEnabled = false;
    const botonesAcc = { ...botonesAcciones }
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

    setBotonesAcciones(botonesAcc);
    setChecked(newChecked);

  };

  const menuHandleClose = (value) => {

    setMenuContext(null);

  }

  const menuHandleItemClick = (value) => {
    const newItem = { ...botonesAcciones[value] };

    if (botonesAcciones[value].enabled) {

      setMenuContext(null);
      props.history.push('/users/newuser');


    }
  }

  const menuHandleOpen = event => {
    setMenuContext(event.currentTarget)

  }

  const modalHandleOpen = () => {
    setModalOpen(true);

  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const getUsersAdmin = () => {

    axios.get('/list-users')
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
        setUsers(resultado);
        }
      })

     //this.state.newUserForm.tipoUser.elementConfig.options

      axios.get('/list-users_type')
      .then(res => {
        if (res.data.success == 1) {
          let resultadoUserType = [...res.data.result];
          let newUserFormAlt2 = {...newUserForm};

          /*
          let auxiliar = resultadoUserType.map((element) => {
            return { value:element.id, displayValue:element.desc}
          })
          */

          let a = [];
          resultadoUserType.forEach(function(entry){
            a.push({
              value: entry.id,
              displayValue: entry.desc
            });
          })


          newUserFormAlt.tipoUser.elementConfig.options = a;

          setNewUserForm(newUserFormAlt2);

        }
      })
    }
  /*
      {
        value:1,
        displayValue:'admin'
      },
      {
        value:2,
        displayValue:'pañol'
      }
  }*/

  React.useEffect(() => {


      axios.get('/me')
        .then(res => {
          if (res.data.success == 1) {

          } else if (res.data.success == 3) {
            props.history.replace('/');
          }

        })



    getUsersAdmin();

  }, []);


    const checkValidity = (value, rules) => {
        let isValid = true;
        let textValid = null;

        if (rules.required) {
            isValid = value.toString().trim() !== '' && isValid;
            textValid = 'El campo es requerido'
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            textValid = 'No supera la cantidad de caracteres minimos'
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            textValid = 'Supera el maximo de caracteres';
        }

        return {isValid:isValid,textValid:textValid};
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...newUserForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid =  checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidAlt2 = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt2 = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setNewUserForm(updatedOrderForm);
        setFormIsValid(formIsValidAlt2);
    }







  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Switch>
            <Route path="/admin/usuarios" exact  render={() =>

              <ListUsers
                  menuHandleOpen={(event) => menuHandleOpen(event)}
                  menuHandleClose={(event) => menuHandleClose(event)}
                  menuHandleItemClick={(keyName) => menuHandleItemClick(keyName)}
                  handleToggle={(value) => handleToggle(value)}
                  deleteUser={(value) => deleteUser(value)}

                  menuContext={menuContext}
                  botonesAcciones={botonesAcciones}
                  users={users}
                  checked={checked}



              />


            } />
            <Route path="/admin/usuarios/newuser"  render={() =>

             <NewUser
             orderForm={newUserForm}
             formIsValid={formIsValid}


             inputChangedHandler={ (event,inputIdentifier)=> inputChangedHandler(event,inputIdentifier)}

             />

            } />
        </Switch>


      </GridItem>
    </GridContainer>
  );
}
