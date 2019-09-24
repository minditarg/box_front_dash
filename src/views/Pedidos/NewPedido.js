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

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const columns = [{ title: "id", field: "id" },
// { title: "Usuario", field: "username" },
// { title: "Identificador", field: "identificador" },
// { title: "Proveedor", field: "proveedor" },
// { title: "Fecha", field: "fecha" }
// ];

const columnsInsumos = [{ title: "id", field: "id", editable: 'never' },
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
  }
};

class NewPedido extends Component {
    state = {
        pedidos: [],
        open: false,
        detallepedidos: [],
        actions: [],
        actionsInsumos: [],
        insumos: [],
        insumoSeleccionado: 0,
        orderForm: {
            codigo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Identificador',
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
                    label: 'Proveedor',
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
        pedidoInsertado: false
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


    handleSubmitNewPedido = (event) => {
        event.preventDefault();
       // alert("cod: " + event.target[0].value + " desc: " + event.target[1].value);
        console.log(this.state.detallepedidos);
        axios.post('/insert-pedidos', {
            codigo: event.target[0].value,
            descripcion: event.target[1].value,
            detalle: this.state.detallepedidos
        })
            .then(res => {
                if (res.data.success == 1) {
                    // this.setState({pedidoInsertado: true});
                    toast.success("Nuevo ingreso creado");
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

    insumoSelectHandler = (id) => {
        //alert("seleccionandoooo " + id);
        this.closeDialog();

        axios.get('/select-insumos/'+id)
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
            // alert('HOLA ' + id);
             let detallepedidoant = [...this.state.detallepedidos];
             console.log(resultado);
            // alert(detallepedidoant.length);
             detallepedidoant = detallepedidoant.concat(resultado);
            // alert(detallepedidoant.length);
              this.setState({
                detallepedidos: [...detallepedidoant]
              })
            }
            else
            {
                alert("error");
            }
          })
        
    }


    deleteInsumo = (rowData) => {
        
        //alert("eliminando: " + this.state.detallepedidos.indexOf(rowData));
        //data.splice(data.indexOf(oldData), 1);
        let detallepedidosant = [...this.state.detallepedidos];
        detallepedidosant.splice(detallepedidosant.indexOf(rowData), 1);
        this.setState({
            detallepedidos : detallepedidosant
        });
        //this.state.detallepedidos.splice(this.state.detallepedidos.indexOf(rowData), 1);
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
                this.handleSubmitNewPedido(event)

            }}>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.props.classes.cardTitleWhite} >Nuevo Ingreso</h4>
                        <p className={this.props.classes.cardCategoryWhite} >
                            Detalles del Ingreso
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

                        <Dialog open={this.state.open} onEnter={console.log('Dialogo')}>
                            <DialogTitle>Seleccionar Insumo</DialogTitle>
                            <DialogContent>
                                <MaterialTable
                                    columns={columnsInsumos}
                                    data={this.state.insumos}
                                    title="Ingreso"
                                    actions={this.state.actionsInsumos}
                                />
                                <Button onClick={this.closeDialog.bind(this)} >Cerrar</Button>
                            </DialogContent>
                        </Dialog>

                        <MaterialTable
                            columns={columnsInsumos}
                            data={this.state.detallepedidos}
                            title="Detalle Ingreso"
                            actions={this.state.actions}
                            editable={{
                                onRowAdd: newData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      {
                                        const data = this.state.detallepedidos;
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
                                        const data = this.state.detallepedidos;
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
                                        let data = this.state.detallepedidos;
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


export default withStyles(styles)(NewPedido);