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



const columnsInsumos = [{ title: "id", field: "id", editable: 'never' },
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
                    required: false
                },
                valid: true,
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
                    required: false
                },
                valid: true,
                touched: false
            },
            cantidad: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Cantidad',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
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
       //alert("cod: " + event.target[0].value + " desc: " + event.target[1].value + " canti: " + event.target[2].value);
        //console.log(this.state.detallepedidos);
        axios.post('/ajuste-stock', {
            codigo: event.target[0].value,
            descripcion: event.target[1].value,
            cantidad: event.target[2].value//,
            //detalle: this.state.detallepedidos
        })
            .then(res => {
                if (res.data.success == 1) {
                    // this.setState({pedidoInsertado: true});
                    toast.success("Insumo Ajustado");
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

        //{"success":1,
        //"result":[{"id":25,"codigo":"PCs","descripcion":"computadoras","activo":1,"unidad":"unidad","minimo":3,"stock":6}]}
        axios.get('/select-insumos/'+ id)
          .then(res => {
            if (res.data.success == 1) {
               // alert(res.data.result.value);
                let resultado = [...res.data.result];
                
                console.log(resultado);
             //   alert(resultado[0].id);
               


               // this.state.orderForm.codigo.value = resultado[0].id;
            let ordenformNuevo = {...this.state.orderForm};
                ordenformNuevo.codigo.value = resultado[0].id;
                ordenformNuevo.descripcion.value = resultado[0].descripcion;
                ordenformNuevo.cantidad.value = resultado[0].cantidad;
                this.setState({
                    orderForm: ordenformNuevo
                })
            }
            else
            {
                alert("error");
            }
          })
        
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

                        <Button style={{ marginTop: '25px' }} color="primary" onClick={this.openDialog.bind(this)} > Seleccionar Insumo</Button>

                        <Dialog open={this.state.open} onEnter={console.log('Dialogo')}>
                            <DialogTitle>Seleccionar Insumo</DialogTitle>
                            <DialogContent>
                                <MaterialTable
                                    columns={columnsInsumos}
                                    data={this.state.insumos}
                                    title="Insumo"
                                    actions={this.state.actionsInsumos}
                                />
                                <Button onClick={this.closeDialog.bind(this)} >Cerrar</Button>
                            </DialogContent>
                        </Dialog>

                        

                        <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid} type="submit" ><Save /> Ajustar </Button>
                        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>

                    </CardBody>
                </Card>
            </ form>
        );
    }
}


export default withStyles(styles)(AjusteStock);