import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import {  toast } from 'react-toastify';
import {localization} from "variables/general.js";


const columnsInsumos = [
{ title: "Codigo", field: "codigo", editable: 'never' },
{ title: "Descripcion", field: "descripcion", editable: 'never' },
{ title: "Activo", field: "activo", editable: 'never' },
{ title: "Cantidad", field: "cantidad", type: 'numeric' }
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

class AjusteStock extends Component {
    state = {
        pedidos: [],
        open: false,
        codigo: null,
        descripcion: "",
        stock: null,
        actions: [],
        actionsInsumos: [],
        insumos: [],
        insumoSeleccionado: 0,
        rowDetalle: null,
        orderForm: {
            codigo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled: true,
                    label: 'Codigo Interno',
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
                    disabled: true,
                    label: 'Descripcion',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            cantidad: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    label: 'Cantidad',
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
        Database.get('/list-insumos',this,null,true)
            .then(res => {

                    let resultado = [...res.result];
                    this.setState({
                        insumos: resultado
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

    inputChangedHandler = (event, inputIdentifier) => {
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
        Database.post('/ajuste-stock', {
            id: this.state.rowDetalle.id,

            cantidad: this.state.orderForm.cantidad.value

        },this)
            .then(res => {

                    toast.success("Insumo Ajustado");
            },err => {
              toast.error(err.message);
            })
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false });
    }

    insumoSelectHandler = (rowData) => {
        this.closeDialog();

                    let resultado = {...rowData};
                    let ordenformNuevo = { ...this.state.orderForm };
                    ordenformNuevo.codigo.value = resultado.codigo + resultado.numero ;
                     ordenformNuevo.codigo.elementConfig.disabled = false;
                     ordenformNuevo.codigo.elementConfig.InputProps = { readOnly: true};
                    ordenformNuevo.codigo.touched = true;
                    ordenformNuevo.codigo.valid = true;
                    ordenformNuevo.descripcion.value = resultado.descripcion;
                     ordenformNuevo.descripcion.elementConfig.disabled = false;
                     ordenformNuevo.descripcion.elementConfig.InputProps = { readOnly: true};

                    ordenformNuevo.descripcion.touched = true;
                    ordenformNuevo.descripcion.valid = true;
                    ordenformNuevo.cantidad.value = resultado.cantidad;
                    ordenformNuevo.cantidad.touched = false;
                    this.setState({
                        orderForm: ordenformNuevo,
                        formIsValid: false,
                        rowDetalle: resultado
                    })


    }


    componentDidMount() {
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

            } }>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.props.classes.cardTitleWhite} >Ajuste de Stock</h4>
                        <p className={this.props.classes.cardCategoryWhite} >
                            Detalle de Insumo
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

                        <Button style={{ marginTop: '25px' }} color="success" onClick={this.openDialog.bind(this)} ><AddIcon /> Seleccionar Insumo</Button>

                        <Dialog open={this.state.open} onEnter={console.log('Dialogo')}>
                            <DialogTitle>Seleccionar Insumo</DialogTitle>
                            <DialogContent>
                                <MaterialTable
                                    columns={columnsInsumos}
                                    data={this.state.insumos}
                                    title="Insumo"
                                    localization={localization}
                                    onRowClick={(event, rowData) => this.insumoSelectHandler(rowData)}
                                    />
                                <Button onClick={this.closeDialog.bind(this)} >Cerrar</Button>
                            </DialogContent>
                        </Dialog>



                        <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Ajustar </Button>


                    </CardBody>
                </Card>
            </ form>
        );
    }
}


export default withStyles(styles)(AjusteStock);
