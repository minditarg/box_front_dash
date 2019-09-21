import React, { Component } from "react";
import axios from "axios";
import Input from "components/Input/Input";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";

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


const columns = [{ title: "id", field: "id" },
{ title: "Usuario", field: "username" },
{ title: "Identificador", field: "identificador" },
{ title: "Proveedor", field: "proveedor" },
{ title: "Fecha", field: "fecha" }
];

class NewPedido extends Component {
    state = {
        pedidos: [],
        open: false,
        detallepedidos: [],
        actions: [],
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

        axios.post('/insert-pedidos', {
            codigo: event.target[0].value,
            descripcion: event.target[1].value
        })
            .then(res => {
                if (res.data.success == 1) {
                    // this.setState({pedidoInsertado: true});
                    alert("Nuevo pedido creado");
                }
                else {
                    alert("error");
                }
            })
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false });
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
                        <h4 >Nuevo Pedido</h4>
                        <p >
                            Formulario alta de Pedido
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
                                
                                <Button onClick={this.closeDialog.bind(this)} >Cerrar</Button>
                            </DialogContent>
                        </Dialog>

                        <MaterialTable
                            columns={columns}
                            data={this.state.detallepedidos}
                            title="Detalle Pedidos"
                            actions={this.state.actions}
                        />

                        <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Guardar</Button>

                    </CardBody>
                </Card>
            </ form>
        );
    }
}


export default NewPedido;