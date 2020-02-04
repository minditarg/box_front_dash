import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import moment from "moment";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import esLocale from "date-fns/locale/es";


// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
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
import { FixedSizeList } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
    { title: "Identificador", field: "identificador", editable: 'never' },
    { title: "Descripcion", field: "descripcion", editable: 'never' },
    { title: "Cantidad", field: "cantidad", type: 'numeric' },
    { title: "Unidades", field: "unidad", editable: 'never'},
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

class NewIngreso extends Component {
    state = {
        ingresos: [],
        open: false,
        detalleingresos: [],
        actions: [],
        actionsInsumos: [],

        plantillas: [],
        openPlantillaDialog: false,
        idPlantilla:'',
        rowSelectPlantilla:null,
        detalleSelectPlantilla:[],

        selectedDate: new Date(),

        insumoSeleccionado: 0,
        orderForm: {
            referencia: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Referencia',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            proveedor: {
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
        ingresoInsertado: false,
        disableAllButtons: false,
        dateFormIsValid: true
    }


    // constructor(props) {
    //     super(props);
    //     this.buscarRef = React.createRef();

    //     // this.detallePedidos = [];
    //     // this.copiaDetallePedidos = [];


    // }

    handleDateChange = (date,value) => {

      let dateState = null;
      let dateFormIsValid = false;
      if(date == "Invalid date") {

      } else {
        dateState = date;
        dateFormIsValid = true
      }
      this.setState({
          selectedDate: date,
          dateFormIsValid:dateFormIsValid
      },()=>{
        this.inputChangedHandler(null,null)
      })


    };

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

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        if(inputIdentifier) {
        let checkValid;

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        }
        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }

      formIsValidAlt = this.state.dateFormIsValid && formIsValidAlt;
      formIsValidAlt = (this.state.detalleingresos.length > 0) && formIsValidAlt;

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt

        })

    }


    handleSubmitNewPedido = (event) => {
        event.preventDefault();

        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
          this.setState({
            disableAllButtons:true
          })
            Database.post('/insert-ingresos', {
                fechaReferencia: moment(event.target[0].value, "DD/MM/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                referencia: event.target[2].value,
                proveedor: event.target[3].value,
                detalle: this.state.detalleingresos
            },this)
                .then(res => {


                        // this.setState({pedidoInsertado: true});
                        this.props.getIngresos();
                        toast.success("Nuevo ingreso creado");

                        setTimeout(()=>{
                          this.props.history.push("/admin/ingresos");
                        },1000)


                },err => {
                  this.setState({
                    disableAllButtons:false
                  })
                  toast.error(err.message);
                })
        }
    }

    handleSelectPlantilla = (event)=> {
        event.preventDefault();
        let idPlantilla = parseInt(event.target.value);
        let indexSeleccionado = this.state.plantillas.findIndex(elem =>{
          return (elem.id == idPlantilla);
        })
        if(indexSeleccionado > -1)
        {
          this.setState({
            idPlantilla: event.target.value,
            rowSelectPlantilla: this.state.plantillas[indexSeleccionado],
            detalleSelectPlantilla: [],
          })

          Database.get('/list-plantillas-insumos/' + idPlantilla,this )
            .then(res => {
  
                this.setState({
                  detalleSelectPlantilla: res.insumos
                })
  
  
  
            },err => {
              toast.error(err.message);
            })  
  
        }
      }  

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false, openPlantillaDialog:false });
    }


    getPlantillas = () => {

        Database.get('/list-plantillas',this )
            .then(res => {

                    let plantillas = [ ...res.result ];
                    this.setState({
                        plantillas: plantillas,

                    })

            },err => {
              toast.error(err.message);
            })
    }


    openPlantilla = () => {

        this.setState({
          idPlantilla :'',
          openPlantillaDialog:true,
          rowSelectPlantilla:null,
          detalleSelectPlantilla:[]
        });
      } 

    
      handleSubmitPlantillas = event => {

       // alert("handleSubmitPlantillas");
        event.preventDefault();
        this.closeDialog();

        console.log("detalleingresos");
        console.log(this.state.detalleingresos);
        
        let insumos =this.state.detalleSelectPlantilla.filter(elem => {
          let findIndex = this.state.detalleingresos.findIndex(elemFind =>{
            return (elem.id == elemFind.id)
          })
          if(findIndex > -1)
            return false
            else
            return true;
        })
        alert("sigue");
                 insumos = insumos.map(elem => {
                  let cantidad = elem.cantidad;
                  delete elem.cantidad;
                  return {
                    ...elem,
                    identificador: elem.codigo + elem.numero,
                    insertado:true,
                    cantidad_requerida:cantidad
                  }
                })
                console.log(insumos);
  
                if(insumos.length < this.state.detalleSelectPlantilla.length)
                  toast.info("Insumos duplicados no se agregaron");
  
                this.state.detalleingresos = insumos.concat(this.state.detalleingresos);
                //this.buscarInsumo(this.buscarRef.current.value);
                this.inputChangedHandler(null,null);
      }

      RowPlantilla(props) {
        const { index, style } = props;
  
        return (
          <ListItem button style={style} key={index}>
            <ListItemText primary={this.state.detalleSelectPlantilla[index].descripcion} secondary={this.state.detalleSelectPlantilla[index].codigo + this.state.detalleSelectPlantilla[index].numero} />
  
            <span>{ this.state.detalleSelectPlantilla[index].cantidad }</span>
  
          </ListItem>
        );
      }


    onClickInsumo = (rowInsumo, cantidad) => {
        this.closeDialog();

        let resultado = {...rowInsumo};
        resultado.cantidad = parseInt(cantidad);
        let detalleingresoant = [...this.state.detalleingresos];

        detalleingresoant.push(resultado);
        this.setState({
            detalleingresos: [...detalleingresoant]
        },()=>{
           // this.buscarInsumo(this.buscarRef.current.value);
            this.inputChangedHandler(null,null);
        })


    }


    deleteInsumo = (rowData) => {

        //alert("eliminando: " + this.state.detallepedidos.indexOf(rowData));
        //data.splice(data.indexOf(oldData), 1);
        let detalleingresosant = [...this.state.detalleingresos];
        detalleingresosant.splice(detalleingresosant.indexOf(rowData), 1);
        this.setState({
            detalleingresos: detalleingresosant
        },()=>{
          this.inputChangedHandler(null,null);
        });
        //this.state.detallepedidos.splice(this.state.detallepedidos.indexOf(rowData), 1);
    }


    componentDidMount() {

        this.state.actions = [
            {
                icon: 'delete',
                tooltip: 'Eliminar Insumo',
                onClick: (event, rowData) => this.deleteInsumo(rowData)
            }
        ];
        this.state.actionsInsumos = [
            {
                icon: 'save',
                tooltip: 'Seleccionar Insumo',
                onClick: (event, rowData) => this.insumoSelectHandler(rowData.id)

            }];

        this.getPlantillas();
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
                                <h4 className={this.props.classes.cardTitleWhite} >Nuevo Ingreso</h4>
                                <p className={this.props.classes.cardCategoryWhite} >
                                    Detalles del Ingreso
                                  </p>
                            </CardHeader>
                            <CardBody>

                                <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Fecha Referencia"
                                        format="dd/MM/yyyy"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        autoOk={true}
                                        cancelLabel={"Cancelar"}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                </MuiPickersUtilsProvider>

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

                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} color="success" disabled={this.state.disableAllButtons} onClick={this.openDialog.bind(this)} ><AddIcon /> Insumosss333sssss</Button>
                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} disabled={this.state.disableAllButtons} color="success" onClick={this.openPlantilla.bind(this)} ><AddIcon /> Pedido</Button>

                                <MaterialTable
                                    columns={columnsInsumos}
                                    data={this.state.detalleingresos}
                                    title="Listado de Insumos"
                                    actions={this.state.actions}
                                    localization={localization}
                                    editable={{

                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    {
                                                        const data = this.state.detalleingresos;
                                                        const index = data.indexOf(oldData);
                                                        data[index] = newData;
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


                                <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/ingresos')} ><ArrowBack />Volver</Button> <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>

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
                </Dialog>,
                <Dialog
                    open={this.state.openPlantillaDialog}
                    onClose={this.closeDialog.bind(this)}
                    fullWidth={true}
                    maxWidth={"md"}
                    >
                    <DialogTitle>Seleccionar Plantilla
                            <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>


                    <DialogContent>
                    <form onSubmit={ this.handleSubmitPlantillas }>
                    <FormControl className={this.props.classes.formControl} >
                      <InputLabel id="plantillas-label">Plantillas</InputLabel>
                        <Select
                          labelId="plantillas-label"
                          id="plantillas-select"
                          value={this.state.idPlantilla}
                          onChange={this.handleSelectPlantilla}
                          >
                          { this.state.plantillas.map(elem =>{

                            return (
                              <MenuItem key={elem.id} value={elem.id}>{elem.codigo}</MenuItem>
                            )

                          })}

                          </Select>
                      </FormControl>

                      { this.state.rowSelectPlantilla && <div><p>Descripción: {this.state.rowSelectPlantilla.descripcion} </p>

                      <FixedSizeList height={200} width={900} itemSize={65} itemCount={this.state.detalleSelectPlantilla.length}>
                          {this.RowPlantilla.bind(this)}
                      </FixedSizeList> </div>}

                      <div style={{ marginTop:'25px',textAlign:'right'}}>
                      <Button onClick={this.closeDialog.bind(this)} style={{marginRight:'10px'}}>Cancelar</Button>
                      <Button type="submit" disabled={this.state.detalleSelectPlantilla.length <= 0} variant="contained" color="primary"  >
                          Seleccionar
                        </Button>
                        </ div>
                        </form>
                    </DialogContent>
                </Dialog>
            </ form>
        );
    }
}


export default withRouter(withStyles(styles)(NewIngreso));
