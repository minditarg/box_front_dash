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

class NewEgreso extends Component {
    state = {
        egresos: [],
        open: false,
        detalleegresos: [],
        actions: [],
        actionsInsumos: [],
        insumos: [],
        insumoSeleccionado: 0,
        orderForm: {
            codigo: {
                elementType: 'select',
                elementConfig: {
                    label: 'Codigo Modulo',
                    options: [

                    ],
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
                    fullWidth: true,
                    disabled : true
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
        egresoInsertado: false
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

      getModulosEnProduccion = () => {
        axios.get('/list-modulos-produccion')
          .then(res => {
            if (res.data.success == 1) {
                    let resultado = [...res.data.result];

                    let a = [];
                    resultado.forEach(function (entry) {
                        a.push({
                            value: entry.id,
                            displayValue: entry.codigo
                        });
                    })

                   // console.log(a);
                    let ordenformNuevo = { ...this.state.orderForm };
                   // console.log("antes");
                   // console.log(ordenformNuevo.codigo.options);
                    ordenformNuevo.codigo.elementConfig.options = [...a];   
                  //  console.log(ordenformNuevo);
                  //  console.log("despues");      
                  //  console.log(ordenformNuevo.codigo.elementConfig.options);
                    this.setState({
                        orderForm: ordenformNuevo
                    },()=>console.log(this.state))
                    
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


    updateInfoModulo = (idModulo) => {
        //alert(idModulo);
        axios.get('/select-modulo/'+idModulo)
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              let newOrderForm = {...this.state.orderForm};

              console.log("RES: " + resultado);
             // alert(resultado[0]);
              newOrderForm.descripcion.value = resultado[0].descripcion;

              this.setState({
                orderForm: newOrderForm
              })
            }
          })
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

        if (inputIdentifier == "codigo")
        {
           
            this.updateInfoModulo(event.target.value);

        }

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


    handleSubmitNewEgreso = (event) => {
        event.preventDefault();
       // alert("cod: " + event.target[0].value + " desc: " + event.target[1].value);
        console.log(this.state.detalleegresos);
        axios.post('/insert-egresos', {
            codigo: event.target[0].value,
            descripcion: event.target[1].value,
            detalle: this.state.detalleegresos
        })
            .then(res => {
                if (res.data.success == 1) {
                    // this.setState({egresoInsertado: true});
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
             let detalleegresoant = [...this.state.detalleegresos];
             console.log(resultado);
            // alert(detalleegresoant.length);
             detalleegresoant = detalleegresoant.concat(resultado);
            // alert(detalleegresoant.length);
              this.setState({
                detalleegresos: [...detalleegresoant]
              })
            }
            else
            {
                alert("error");
            }
          })
        
    }


    deleteInsumo = (rowData) => {
        
        //alert("eliminando: " + this.state.detalleegresos.indexOf(rowData));
        //data.splice(data.indexOf(oldData), 1);
        let detalleegresosant = [...this.state.detalleegresos];
        detalleegresosant.splice(detalleegresosant.indexOf(rowData), 1);
        this.setState({
            detalleegresos : detalleegresosant
        });
        //this.state.detalleegresos.splice(this.state.detalleegresos.indexOf(rowData), 1);
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
        this.getModulosEnProduccion();
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
                this.handleSubmitNewEgreso(event)

            }}>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.props.classes.cardTitleWhite} >Pañol</h4>
                        <p className={this.props.classes.cardCategoryWhite} >
                            Asignación de insumos a Módulos
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
                            data={this.state.detalleegresos}
                            title="Detalle Ingreso"
                            actions={this.state.actions}
                            editable={{
                                onRowAdd: newData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      {
                                        const data = this.state.detalleegresos;
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
                                        const data = this.state.detalleegresos;
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
                                        let data = this.state.detalleegresos;
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


export default withStyles(styles)(NewEgreso);