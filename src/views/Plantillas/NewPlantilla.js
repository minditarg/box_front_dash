import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import moment from "moment";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import InputFiles from 'react-input-files';


// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TextField from '@material-ui/core/TextField';

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
import DeleteIcon from '@material-ui/icons/Delete';
import ControlCamera from '@material-ui/icons/ControlCamera';
import Search from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    { title: "Identificador", field: "identificador", editable: 'never' },
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


const SortableItem = sortableElement(({value, deleteInsumo}) =>
    <TableRow>
        <TableCell>
            <DragHandle />
        </TableCell>
        <TableCell>
            <IconButton onClick={() => deleteInsumo(value.id)}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
        <TableCell>
            {value.descripcion}
        </TableCell>
        <TableCell>
            {value.cantidad}
        </TableCell>
    </TableRow>
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({children}) => {
    return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
        <TableHead>
            <TableRow>
                <TableCell>Ordenar</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Cantidad</TableCell>


            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});


class NewPlantilla extends Component {
    state = {
        plantillas: [],
        open: false,
        detallePlantillas: [],
        actions: [],
        actionsPlantillas: [],

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
        plantillaInsertada: false,
        disableAllButtons: false

    }


    constructor(props) {
        super(props);
        this.buscarRef = React.createRef();

        this.detallePlantillas = [];


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
        formIsValidAlt = this.state.detallePlantillas.length > 0 && formIsValidAlt;

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt
        })
    }


    handleSubmitNewPlantilla = (event) => {
        event.preventDefault();
        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {

            Database.post('/insert-plantilla', {
                //fechaIdentificador: moment(event.target[0].value, "MM/DD/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                codigo: this.state.orderForm.codigo.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: this.state.detallePlantillas
            },this)
                .then(res => {

                        toast.success("Nueva plantilla creada");
                        this.props.getPlantillas();
                        this.props.history.push("/admin/plantillas");

                },err => {

                  toast.error(err.message);
                })
        }
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeDialog() {
        this.setState({ open: false });
    }

    onClickInsumo = (rowInsumo, cantidad) => {
        this.closeDialog();


        let resultado = { ...rowInsumo };
        resultado.cantidad = cantidad;
        let detallePlantillas = [...this.state.detallePlantillas];

        detallePlantillas = detallePlantillas.concat(resultado);
        this.detallePlantillas = this.detallePlantillas.concat(resultado);

        this.setState({
            detallePlantillas: [...detallePlantillas]
        }, () => {
            this.buscarInsumo(this.buscarRef.current.value);
            this.inputChangedHandler()
        })



    }


    deleteInsumo = (rowData) => {




        let detallePlantillas = [...this.state.detallePlantillas];
        detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);
        this.detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);

        this.setState({
            detallePlantillas: detallePlantillas
        }, () => this.inputChangedHandler());

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

    inputFile = (e) => {

        console.log(e);

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
                this.handleSubmitNewPlantilla(event);

            } }>
                <GridContainer>


                    <GridItem xs={12} sm={12} md={10} >
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={this.props.classes.cardTitleWhite} >Nueva Plantilla</h4>
                                <p className={this.props.classes.cardCategoryWhite} >
                                    Creación de plantillas para la construcción de Módulos
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

                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} disabled={this.state.disableAllButtons} color="success" onClick={this.openDialog.bind(this)} ><AddIcon /> Insumo</Button>
                                <InputFiles accept="text/csv" onChange={files => console.log(files)}>
                                    <Button color="info">Subir plantilla</Button>
                                </InputFiles>
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
                                        <SortableItem key={`item-${elem.id}`} index={index} value={elem} deleteInsumo={this.deleteInsumo} />
                                    ))}


                                </SortableContainer>
                                {this.state.isLoading &&
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


export default withRouter(withStyles(styles)(NewPlantilla));
