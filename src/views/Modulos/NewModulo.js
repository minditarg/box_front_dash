import React, { Component } from "react";
import axios from "axios";
import Input from "components/Input/Input";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import StepAgregarInsumo from './components/StepAgregarInsumo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {localization} from "variables/general.js";

// const columns = [{ title: "id", field: "id" },
// { title: "Usuario", field: "username" },
// { title: "Identificador", field: "identificador" },
// { title: "Proveedor", field: "proveedor" },
// { title: "Fecha", field: "fecha" }
// ];

const columnsInsumos = [
{ title: "Codigo", field: "codigo", editable: 'never' },
{ title: "Descripcion", field: "descripcion", editable: 'never' },
{ title: "Activo", field: "activo", editable: 'never' },
{ title: "Cantidad", field: "cantidad", type: 'numeric' }
//{ title: 'Cantidad', field: 'cantidad', render: rowData => <input type="text"/>}
];

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
  },
  closeButton: {
    position: 'absolute',
    right: '0.5em',
    top: '0.5em',
    color: 'grey',
  }
};

class NewModulo extends Component {
    state = {
        modulos: [],
        open: false,
        detallemodulos: [],
        actions: [],
        actionsInsumos: [],
        insumos: [],
        insumoSeleccionado: 0,
        orderForm: {
            chasis: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Chasis',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            descripcion: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Descripcion',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        moduloInsertado: false
    }

    getInsumos = () => {
        axios.get('/list-insumos')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                insumos: resultado
              })
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
            isValid = value.length <= rules.maxLength;
            textValid = 'Supera el maximo de caracteres';
        }

        return { isValid: isValid, textValid: textValid };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //alert("modificado");
        let checkValid;
        const updatedOrderForm = {
            ...this.state.orderForm
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
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt

        })

    }


    handleSubmitNewModulo = (event) => {
        event.preventDefault();
       // alert("cod: " + event.target[0].value + " desc: " + event.target[1].value);
        console.log(this.state.detallemodulos);
        axios.post('/insert-modulos', {
            codigo: event.target[0].value,
            descripcion: event.target[1].value,
            detalle: this.state.detallemodulos
        })
            .then(res => {
                if (res.data.success == 1) {
                    // this.setState({moduloInsertado: true});
                    toast.success("Nuevo modulo creado");
                }
                else {
                    toast.error("Error");
                }
            })
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false });
    }

    onClickInsumo = (id,cantidad) => {
        this.closeDialog();

        axios.get('/select-insumos/'+id)
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              resultado[0].cantidad = cantidad;
             let detallemoduloant = [...this.state.detallemodulos];

             detallemoduloant = detallemoduloant.concat(resultado);
              this.setState({
                detallemodulos: [...detallemoduloant]
              })
            }
            else
            {
                alert("error");
            }
          })

    }


    deleteInsumo = (rowData) => {

        //alert("eliminando: " + this.state.detallemodulos.indexOf(rowData));
        //data.splice(data.indexOf(oldData), 1);
        let detallemodulosant = [...this.state.detallemodulos];
        detallemodulosant.splice(detallemodulosant.indexOf(rowData), 1);
        this.setState({
            detallemodulos : detallemodulosant
        });
        //this.state.detallemodulos.splice(this.state.detallemodulos.indexOf(rowData), 1);
    }


    componentDidMount() {
        this.state.actions=[
            {
              icon: 'delete',
              tooltip: 'Eliminar Insumo',
              onClick: (event, rowData) => this.deleteInsumo(rowData)
            }
          ];
        this.state.actionsInsumos=[
            {
              icon: 'save',
              tooltip: 'Seleccionar Insumo',
              onClick: (event, rowData) => this.insumoSelectHandler(rowData.id)

            }];
        this.getInsumos();
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return (
            <form onSubmit={(event) => {
                this.handleSubmitNewModulo(event)

            }}>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.props.classes.cardTitleWhite} >Nuevo Modulo</h4>
                        <p className={this.props.classes.cardCategoryWhite} >
                            Detalles del Modulo
          </p>
                    </CardHeader>
                    <CardBody>



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
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}

                        <Button style={{ marginTop: '25px' }} color="primary" onClick={this.openDialog.bind(this)} > Agregar Insumo</Button>

                        <Dialog open={this.state.open} onClose={this.closeDialog.bind(this)}>
                            <DialogTitle>Seleccionar Insumo
                            <IconButton aria-label="close" className={this.props.classes.closeButton}  onClick={this.closeDialog.bind(this)}>
                                <CloseIcon />
                              </IconButton>
                            </DialogTitle>


                            <DialogContent>
                            { this.state.open &&
                            <StepAgregarInsumo
                            columnsInsumos = {columnsInsumos}
                            insumos={this.state.insumos}
                            orderForm={this.state.orderForm}
                            onClickInsumo = {(id,cantidad) => this.onClickInsumo(id,cantidad)}
                            />
                          }
                            </DialogContent>
                        </Dialog>

                        <MaterialTable
                            columns={columnsInsumos}
                            data={this.state.detallemodulos}
                            title="Detalle Modulo"
                            actions={this.state.actions}
                            localization={localization}
                            editable={{
                                onRowAdd: newData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      {
                                        const data = this.state.detallemodulos;
                                        data.push(newData);
                                        this.setState({ data }, () => resolve());
                                      }
                                      resolve()
                                    }, 1000)
                                  }),
                                onRowUpdate: (newData, oldData) =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      {
                                        const data = this.state.detallemodulos;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.setState({ data }, () => resolve());
                                      }
                                      resolve()
                                    }, 1000)
                                  }),
                                onRowDelete: oldData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      {
                                        let data = this.state.detallemodulos;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({ data }, () => resolve());
                                      }
                                      resolve()
                                    }, 1000)
                                  }),
                              }}
                        />

                        <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Guardar</Button>
                        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>

                    </CardBody>
                </Card>
            </ form>
        );
    }
}


export default withStyles(styles)(NewModulo);
