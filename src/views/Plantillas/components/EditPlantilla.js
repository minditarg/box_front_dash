import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import moment from "moment";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TextField from '@material-ui/core/TextField';
import ExportXLS from 'components/ExportXLS/ExportXLS';


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBack from '@material-ui/icons/ArrowBack';
import ControlCamera from '@material-ui/icons/ControlCamera';
import Save from '@material-ui/icons/Save';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UndoIcon from '@material-ui/icons/Undo';
import Search from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import StepAgregarInsumo from './StepAgregarInsumo';
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


const columnsCsv = [
    { displayName: "Descripcion", id: "descripcion" },
    { displayName: "Cantidad", id: "cantidad" }
    //{ title: 'Cantidad', field: 'cantidad', render: rowData => <input type="text"/>}
];


const headers = [
    { label: "Identificador", key: "identificador" },
    { label: "Descripcion", key: "descripcion" },
    { label: "Cantidad Requerida", key: "cantidad" }
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

const SortableItem = sortableElement(({value, deleteInsumo, editInsumo, undoDelete, undoInsertado, undoModificado}) => {
    let style = null;
    let iconos = null
    if (value.eliminado) {
        style = { backgroundColor: 'lightsalmon' };
        iconos = <TableCell>
            <IconButton size="small" onClick={() => undoDelete(value)}>
                < UndoIcon />
            </IconButton>
        </TableCell>

    } else if (value.modificado) {
        style = { backgroundColor: 'lightblue' };
        iconos = <TableCell>
            <IconButton size="small" onClick={() => undoModificado(value)}>
                < UndoIcon />
            </IconButton>
        </TableCell>

    } else if (value.insertado) {
        style = { backgroundColor: 'lightgreen' };
        iconos = <TableCell>
            <IconButton size="small" onClick={() => undoInsertado(value)}>
                < UndoIcon />
            </IconButton>
        </TableCell>
    } else {
        iconos = <TableCell>
            <IconButton size="small" onClick={() => deleteInsumo(value)}>
                <DeleteIcon />
            </IconButton>
            <IconButton size="small" onClick={() => editInsumo(value)}>
                <EditIcon />
            </IconButton>
        </TableCell>
    }



    return (<TableRow style={style}>
        <TableCell>
            <DragHandle />
        </TableCell>
        {iconos}

        <TableCell>
            {value.identificador}
        </TableCell>
        <TableCell>
            {value.descripcion}
        </TableCell>
        <TableCell>
            {value.cantidad}
        </TableCell>
        <TableCell>
            {value.unidad}
        </TableCell>
    </TableRow>)
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({children}) => {
    return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
        <TableHead>
            <TableRow>
                <TableCell>Ordenar</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Identificador</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Unidad</TableCell>


            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});


class EditPlantilla extends Component {
    state = {
        plantilla: null,
        disableAllButtons:false,
        open: false,
        rowEditInsumo: null,
        detallePlantillas: [],
        actions: [],
        actionsInsumos: [],

        selectedDate: new Date(),

        insumoSeleccionado: 0,
        orderForm: {
            codigo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Codigo',
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

        isLoading: true
    }

    constructor(props) {
        super(props);
        this.buscarRef = React.createRef();

        this.detallePlantillas = [];
        this.copiaDetallePlantillas = [];


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
        if (inputIdentifier) {
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
        formIsValidAlt = this.detallePlantillas.length > 0 && formIsValidAlt;

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt
        })
    }

    compararArrays = () => {
        this.detallePlantillas.forEach((elem, index) => {
            let indexEncontrado = this.copiaDetallePlantillas.findIndex(elem2 => {
                if (elem.codigo == elem2.codigo && elem.numero == elem2.numero)
                    return true;
                return false
            })

            if (indexEncontrado < 0) {
                console.log("insert element");
                console.log(elem);
            } else {
                if (elem.cantidad != this.copiaDetallePlantillas[indexEncontrado].cantidad) {
                    console.log("update cantidad")
                    console.log(elem);
                }
                if (index != indexEncontrado) {
                    console.log("cambiar orden");
                    console.log(elem);
                }


            }


        })
    }


    handleSubmitEditPlantilla = (event) => {
        event.preventDefault();

        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
            let detalleEdit = this.detallePlantillas.filter(elem => {
                if (!elem.eliminado)
                    return true;

                return false
            })


            Database.post('/update-plantilla', {
                //fechaIdentificador: moment(event.target[0].value, "MM/DD/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                codigo: this.state.orderForm.codigo.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: detalleEdit,
                id: this.props.match.params.idPlantilla
            },this)
                .then(res => {
                         toast.success("Guardado de plantilla con éxito");
                        this.props.getPlantillas();
                        this.props.history.push("/admin/plantillas");


                },err => {

                     toast.error(err.message);
                })
        }
    }

      handleSubmitNewPlantilla = (event) => {
        event.preventDefault();
        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
            this.setState({ disableAllButtons: true });
            Database.post('/insert-plantilla', {
                //fechaIdentificador: moment(event.target[0].value, "MM/DD/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                codigo: this.state.orderForm.codigo.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: this.state.detallePlantillas
            },this)
                .then(res => {

                        // this.setState({pedidoInsertado: true});
                        // this.props.getIngresos();
                        toast.success("Nueva plantilla creada");
                        this.props.getPlantillas();
                        this.props.history.push("/admin/plantillas");

                },err => {
                  this.setState({ disableAllButtons: false });
                  toast.error(err.message);
                })
        }
    }


    openDialog() {
        this.setState({ open: true, rowEditInsumo: null });
    }

    closeDialog() {
        this.setState({ open: false });
    }

    onClickInsumo = (rowInsumo, cantidad) => {
        this.closeDialog();
        let detallePlantillas;
        let resultado = { ...rowInsumo };



        if (this.state.rowEditInsumo) {
            resultado.cantidadAnterior = resultado.cantidad
            resultado.cantidad = cantidad;
            resultado.modificado = true;

            let indexEncontrado = this.detallePlantillas.indexOf(rowInsumo);
            if (indexEncontrado >= 0) {
                this.detallePlantillas[indexEncontrado] = resultado
            }
        } else {
            let indexInsumo;
            indexInsumo = this.detallePlantillas.findIndex(elem => {
                if (rowInsumo.id == elem.id)
                    return true;

                return false
            })
            if (indexInsumo > -1) {
                toast.error("El Insumo se encuentra en la Plantilla");
            } else {
                resultado.cantidad = cantidad;
                resultado.insertado = true;
                this.detallePlantillas = this.detallePlantillas.concat(resultado);
            }
        }
        detallePlantillas = [...this.detallePlantillas];

        this.setState({
            detallePlantillas: detallePlantillas
        }, () => {
            this.buscarInsumo(this.buscarRef.current.value);
            this.inputChangedHandler()
        })



    }




    getInsumosParcial = (idPlantilla) => {
        this.setState({ isLoading: true });
        Database.get('/list-plantillas-insumos/' + idPlantilla,this)
            .then(res => {


                    let orderForm = { ...this.state.orderForm };
                    let objPlantilla = null;
                    if (res.plantilla.length == 1) {
                        objPlantilla = res.plantilla[0];

                        for (let key in orderForm) {
                            if (objPlantilla[key]) {
                                orderForm[key]['value'] = objPlantilla[key];
                                orderForm[key]['touched'] = true;
                                orderForm[key]['valid'] = true;
                            }
                        }

                    }
                    res.insumos = res.insumos.map(elem => {
                      return {
                        ...elem,
                        identificador: elem.codigo + elem.numero
                      }
                    })

                    this.detallePlantillas = [...res.insumos];
                    this.copiaDetallePlantillas = JSON.parse(JSON.stringify(res.insumos));


                    this.setState({
                        plantilla: res.plantilla[0],
                        orderForm: orderForm,
                        detallePlantillas: res.insumos,
                        isLoading: false
                    }, () => {
                        this.inputChangedHandler();
                    })




            },err => {
              this.setState({ isLoading: false });
              toast.error(err.message);
            })

    }


    deleteInsumo = (rowData) => {
        let resultado = { ...rowData };
        let indexDelete = this.detallePlantillas.indexOf(rowData);
        resultado.eliminado = true;
        this.detallePlantillas[indexDelete] = resultado;

        // detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);
        // this.detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);

        this.setState({
            detallePlantillas: [...this.detallePlantillas]
        }, () => {
            this.inputChangedHandler()
            this.buscarInsumo();
        });

    }

    editInsumo = (rowData) => {

        this.setState({
            open: true,
            rowEditInsumo: rowData
        })

    }

    undoDelete = (rowData) => {
        let resultado = { ...rowData };
        resultado.eliminado = null;
        let indexEliminado = this.detallePlantillas.indexOf(rowData);
        this.detallePlantillas[indexEliminado] = resultado;
        this.setState({
            detallePlantillas: [...this.detallePlantillas]
        }, () => {
            this.inputChangedHandler()
            this.buscarInsumo();
        });

    }

    undoModificado = (rowData) => {
        let resultado = { ...rowData };
        resultado.modificado = null;
        resultado.cantidad = resultado.cantidadAnterior;
        resultado.cantidadAnterior = null;
        let indexEliminado = this.detallePlantillas.indexOf(rowData);
        this.detallePlantillas[indexEliminado] = resultado;
        this.setState({
            detallePlantillas: [...this.detallePlantillas]
        }, () => {
            this.inputChangedHandler()
            this.buscarInsumo();
        });

    }

    undoInsertado = (rowData) => {
        let indexEliminado = this.detallePlantillas.indexOf(rowData);
        this.detallePlantillas.splice(indexEliminado, 1);
        this.setState({
            detallePlantillas: [...this.detallePlantillas]
        }, () => {
            this.inputChangedHandler()
            this.buscarInsumo();
        });

    }

    onSortEnd = ({oldIndex, newIndex}) => {
        if (this.detallePlantillas.length == this.state.detallePlantillas.length) {
            this.detallePlantillas = arrayMove(this.detallePlantillas, oldIndex, newIndex);
            this.setState(({detallePlantillas}) => ({
                detallePlantillas: arrayMove(detallePlantillas, oldIndex, newIndex),
            }));
        }
    };

    buscarInsumo = (value) => {
        let detalle;
        if (value && value != '') {
            detalle = this.detallePlantillas.filter(elem => {
                if (elem.descripcion.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                    return true;

                return false;

            })
        } else {
            detalle = this.detallePlantillas
        }

        this.setState({
            detallePlantillas: detalle
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
        this.state.actionsInsumos = [
            {
                icon: 'save',
                tooltip: 'Seleccionar Insumo',
                onClick: (event, rowData) => this.insumoSelectHandler(rowData.id)

            }];
        if(this.props.match.params.idPlantilla)
        this.getInsumosParcial(this.props.match.params.idPlantilla);

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
                if(this.props.match.params.idPlantilla)
                this.handleSubmitEditPlantilla(event);
                else
                this.handleSubmitNewPlantilla(event);
            } }>
                <GridContainer>


                    <GridItem xs={12} sm={12} md={12} >
                        <Card>
                        { this.props.match.params.idPlantilla ?
                            <CardHeader color="primary">
                                <h4 className={this.props.classes.cardTitleWhite} >Modificar Plantilla: { " " + (this.state.plantilla ? this.state.plantilla.codigo : null)}</h4>
                                <p className={this.props.classes.cardCategoryWhite} >
                                    Modificación de plantilla para la construcción de Módulos
                                  </p>
                            </CardHeader> :
                            <CardHeader color="primary">
                                <h4 className={this.props.classes.cardTitleWhite} >Nueva Plantilla</h4>
                                <p className={this.props.classes.cardCategoryWhite} >
                                    Creación de plantillas para la construcción de Módulos
                                  </p>
                            </CardHeader>
                        }
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

                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} color="success" disabled={this.state.disableAllButtons} onClick={this.openDialog.bind(this)} ><AddIcon /> Insumo</Button>
                                { /*
                                <CSVLink data={this.detallePlantillas} filename={"Plantilla-" + (this.state.plantilla ? this.state.plantilla.codigo : null) + " " + moment(Date.now()).format("DD_MM_YYYY")} headers={headers} separator={";"}>
                                    <Button color="info" >Descargar csv</Button>
                                </CSVLink> */
                              }
                                <ExportXLS csvData={this.state.detallePlantillas} fileName={"Plantilla-" + (this.state.plantilla ? this.state.plantilla.codigo : null) + " " + moment(Date.now()).format("DD_MM_YYYY")} header={headers} />

                                <div style={{ padding: 20 }} >
                                    <Grid container alignItems="flex-end" justify="flex-end" spacing={2}>
                                        <Grid item>
                                            <Search />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="input-with-icon-grid" label="Buscar Insumo" inputProps={{ ref: this.buscarRef }} onChange={(event) => this.buscarInsumo(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </div>

                                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                                    {this.state.detallePlantillas.map((elem, index) => (
                                        <SortableItem key={`item-${index}`} index={index} value={elem} deleteInsumo={this.deleteInsumo} editInsumo={this.editInsumo} undoDelete={this.undoDelete} undoInsertado={this.undoInsertado} undoModificado={this.undoModificado} />
                                    ))}


                                </SortableContainer>
                                {this.state.isLoading && this.props.match.params.idPlantilla &&
                                    <div style={{ textAlign: 'center' }}>
                                        <CircularProgress />
                                    </div>

                                }
                                <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/plantillas')} ><ArrowBack />Volver</Button> <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>

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
                                rowEditInsumo={this.state.rowEditInsumo}
                                columnsInsumos={columnsInsumos}
                                onClickInsumo={(id, cantidad) => this.onClickInsumo(id, cantidad)}
                                />
                        }
                    </DialogContent>
                </Dialog>
            </ form >
        );
    }
}


export default withRouter(withStyles(styles)(EditPlantilla));
