import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch ,Link} from 'react-router-dom';
// core components

import Typography from '@material-ui/core/Typography';
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


const usersConst = [];
const checkedConst = [];
const menuContextConst = null;
const botonesAccionesConst = {
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
const modalOpenConst = false;
const newUserFormConst = {
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
            multilevel: true,

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

const formIsValidConst = false;
const successSubmitConst = null;
const actionUpdateUsersConst = false;



const useStyles = makeStyles(styles);

export default function Users(props) {
 var resetFormFlag = false;

  const classes = useStyles();
  const [users, setUsers] = React.useState(JSON.parse(JSON.stringify(usersConst)));
  const [checked, setChecked] = React.useState(JSON.parse(JSON.stringify(checkedConst)));
  const [menuContext, setMenuContext] = React.useState(JSON.parse(JSON.stringify(menuContextConst)));
  const [botonesAcciones, setBotonesAcciones] = React.useState(JSON.parse(JSON.stringify(botonesAccionesConst)));
  const [modalOpen, setModalOpen] = React.useState(JSON.parse(JSON.stringify(modalOpenConst)));
  const [newUserForm, setNewUserForm] = React.useState(JSON.parse(JSON.stringify(newUserFormConst)));



  const [formIsValid, setFormIsValid] = React.useState(JSON.parse(JSON.stringify(formIsValidConst)));
   const [successSubmit, setSuccessSubmit] = React.useState(JSON.parse(JSON.stringify(successSubmitConst)));
    const [actionUpdateUsers, setActionUpdateUsers] = React.useState(JSON.parse(JSON.stringify(actionUpdateUsersConst)));

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
      if(value == 'nuevo')
      props.history.push(props.match.url + '/nuevousuario');


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
        setChecked(JSON.parse(JSON.stringify(checkedConst)));
        setMenuContext(JSON.parse(JSON.stringify(menuContextConst)));
        setBotonesAcciones(JSON.parse(JSON.stringify(botonesAccionesConst)))


        }
      })

    }

    const getUsersType = () =>
    {
      console.log("paso tercero bis")
         axios.get('/list-users_type')
      .then(res => {

        if (res.data.success == 1) {
          console.log("paso tercero");
          let resultadoUserType = [...res.data.result];
          let newUserFormAlt = JSON.parse(JSON.stringify(newUserForm));

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

          setNewUserForm(newUserFormAlt);

        }
      })
    }


  React.useEffect(() => {

    getUsersAdmin();
    getUsersType();

  }, []);



    const checkValidity = (value, rules) => {
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

        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }
        setNewUserForm(updatedOrderForm);
        setFormIsValid(formIsValidAlt);
    }


    const handleSubmitNewUser = (event) => {

        event.preventDefault();
        axios.post(`/signup-json`, { username: newUserForm.username.value, password: newUserForm.password.value,nombre:newUserForm.nombre.value,id_users_type:newUserForm.tipoUser.value})
            .then(res => {

                let estadoAlt = null
                if (res.data.success == 0) {
                    estadoAlt = false
                }
                if (res.data.success == 1) {
                    estadoAlt = true
                }

                if(estadoAlt){

                  setSuccessSubmit(true);
                  setNewUserForm(JSON.parse(JSON.stringify(newUserFormConst)));
                  setFormIsValid(false);
                  setActionUpdateUsers(true);
                  }
            })

    }


    const reloadUsers = () => {
        if(actionUpdateUsers)
          getUsersAdmin();

          setActionUpdateUsers(false);
    }






  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

      <Switch>
            <Route path={ props.match.url } exact  render={() =>

              <ListUsers
                  menuHandleOpen={(event) => menuHandleOpen(event)}
                  menuHandleClose={(event) => menuHandleClose(event)}
                  menuHandleItemClick={(keyName) => menuHandleItemClick(keyName)}
                  handleToggle={(value) => handleToggle(value)}
                  deleteUser={(value) => deleteUser(value)}
                  reloadUsers={reloadUsers}

                  menuContext={menuContext}
                  botonesAcciones={botonesAcciones}
                  users={users}
                  checked={checked}



              />


            } />
            <Route path={ props.match.url + "/nuevousuario"}  render={() =>

             <NewUser
             orderForm={newUserForm}
             formIsValid={formIsValid}
             successSubmit={successSubmit}

             handleSubmitNewUser={(event) => {handleSubmitNewUser(event)}}
             inputChangedHandler={ (event,inputIdentifier)=> inputChangedHandler(event,inputIdentifier)}

           />}
            />
        </Switch>


      </GridItem>
    </GridContainer>
  );
}
