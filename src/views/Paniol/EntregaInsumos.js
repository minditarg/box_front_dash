import React, { Component } from "react";
import axios from "axios";
import Input from "components/Input/Input";
import moment from "moment";
import { Route, Switch, Link, withRouter } from 'react-router-dom';


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
import AddIcon from '@material-ui/icons/Add';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import StepAgregarInsumo from './components/StepAgregarInsumo';
import Paper from '@material-ui/core/Paper';

import { toast } from 'react-toastify';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { localization } from "variables/general";



// const columns = [{ title: "id", field: "id" },
// { title: "Usuario", field: "username" },
// { title: "Identificador", field: "identificador" },
// { title: "Proveedor", field: "proveedor" },
// { title: "Fecha", field: "fecha" }
// ];

const columnsInsumos = [
    { title: "Codigo", field: "codigo", editable: 'never' },
    { title: "Descripcion", field: "descripcion", editable: 'never' },
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

class EntregaInsumos extends Component {
    state = {
        entregas: [],
        open: false,
        detalleEntregas: [],
        actions: [],
        actionsEntregas: [],
        disableAllButtons:false,

        insumoSeleccionado: 0,
        orderForm: {
            modulo: {
                elementType: 'select',
                elementConfig: {
                    label: 'Módulo',
                    fullWidth: true,
                    options:[

                    ]
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
                    label: 'Descripción',
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
        asignacionInsertada: false
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
        this.setState ({
          disableAllButtons:true
        })
        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
            axios.post('/insert-entregas', {
                id_modulo: this.state.orderForm.modulo.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: this.state.detalleEntregas
            })
                .then(res => {
                  this.setState ({
                    disableAllButtons:false
                  })
                    if (res.data.success == 1) {
                        toast.success("Nueva entrega creada");
                        let orderForm =  {...this.state.orderForm};
                        for(let key in orderForm) {
                          orderForm[key].value = ''
                        };
                        this.setState({
                          orderForm: orderForm,
                          detalleEntregas: []
                        })

                    }
                    else {
                        toast.error("Error");
                    }
                })
        }
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false });
    }

    onClickInsumo = (id, cantidad) => {
        this.closeDialog();

        axios.get('/select-insumos/' + id)
            .then(res => {
                if (res.data.success == 1) {
                    let resultado = [...res.data.result];
                    resultado[0].cantidad = cantidad;
                    let detalleEntregas = [...this.state.detalleEntregas];

                    detalleEntregas = detalleEntregas.concat(resultado);
                    this.setState({
                        detalleEntregas: [...detalleEntregas]
                    })
                }
                else {
                    alert("error");
                }
            })

    }


    deleteInsumo = (rowData) => {

        //alert("eliminando: " + this.state.detallepedidos.indexOf(rowData));
        //data.splice(data.indexOf(oldData), 1);
        let detalleingresosant = [...this.state.detalleingresos];
        detalleingresosant.splice(detalleingresosant.indexOf(rowData), 1);
        this.setState({
            detalleingresos: detalleingresosant
        });
        //this.state.detallepedidos.splice(this.state.detallepedidos.indexOf(rowData), 1);
    }

    getModulos = () => {
      axios.get('/list-modulos') .then((res) => {

        let options = [];
        let orderForm = {...this.state.orderForm};
        res.data.result.forEach((elem) => {
          options.push({displayValue:elem.descripcion, value:elem.id})

        })
        orderForm.modulo.elementConfig.options = options;
        this.setState({
          orderForm: orderForm
        })

      })

    }

    componentDidMount() {

        this.state.actions = [
            {
                icon: 'delete',
                tooltip: 'Eliminar Insumo',
                onClick: (event, rowData) => this.deleteInsumo(rowData)
            }
        ];
        this.state.actionsEntregas = [
            {
                icon: 'save',
                tooltip: 'Seleccionar Insumo',
                onClick: (event, rowData) => this.insumoSelectHandler(rowData.id)

            }];

            this.getModulos();


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
                this.handleSubmitNewPedido(event);

            } }>
                <GridContainer>


                    <GridItem xs={12} sm={10} md={10} >
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={this.props.classes.cardTitleWhite} >ENTREGA DE INSUMOS</h4>
                                <p className={this.props.classes.cardCategoryWhite} >
                                  Se entregan insumos para los diferentes módulos
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

                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} disabled={this.state.disableAllButtons}  color="success" onClick={this.openDialog.bind(this)} ><AddIcon /> Insumo</Button>

                                <MaterialTable
                                    columns={columnsInsumos}
                                    data={this.state.detalleEntregas}
                                    title="Listado de Insumos"
                                    actions={this.state.actions}
                                    localization={localization}
                                    editable={{

                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    {
                                                        const data = this.state.detalleEntregas;
                                                        const index = data.indexOf(oldData);
                                                        data[index] = newData;
                                                        this.setState({ data }, () => resolve());
                                                    }

                                                }, 200)
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    {
                                                        let data = this.state.detalleEntregas;
                                                        const index = data.indexOf(oldData);
                                                        data.splice(index, 1);
                                                        this.setState({ data }, () => resolve());
                                                    }

                                                }, 200)
                                            }),
                                    }}
                                    components={{
                                        Container: props => (
                                            <Paper elevation={0} {...props} />
                                        )
                                    }}
                                    />


                              <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save />Entregar</Button>

                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
                <Dialog
                    open={this.state.open}
                    onClose={this.closeDialog.bind(this)}
                    fullWidth={true}
                    maxWidth={"sm"}
                    >
                    <DialogTitle>Seleccionar Insumo
                            <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>


                    <DialogContent>
                        {this.state.open &&
                            <StepAgregarInsumo
                                columnsInsumos={columnsInsumos}
                                onClickInsumo={(id, cantidad) => this.onClickInsumo(id, cantidad)}
                                />
                        }
                    </DialogContent>
                </Dialog>
            </ form>
        );
    }
}


export default withRouter(withStyles(styles)(EntregaInsumos));
