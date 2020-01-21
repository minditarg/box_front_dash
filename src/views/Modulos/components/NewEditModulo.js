import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import moment from "moment";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";


import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TextField from '@material-ui/core/TextField';


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ButtonMat from '@material-ui/core/Button';
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
import AssignmentIcon from '@material-ui/icons/Assignment';
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

import { localization } from "variables/general";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


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
    { label: "Codigo", key: "codigo" },
    { label: "Descripcion", key: "descripcion" },
    { label: "Cantidad", key: "cantidad" },
    { label: "Asignada", key: "cantidad_asignada" }
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
    formControl: {
    minWidth: 300,
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

    } else if (value.insertado) {
        style = { backgroundColor: 'lightgreen' };
        iconos = <TableCell>
            <IconButton size="small" onClick={() => undoInsertado(value)}>
                < UndoIcon />
            </IconButton>
            <IconButton size="small" onClick={() => editInsumo(value)}>
                <EditIcon />
            </IconButton>
        </TableCell>
    }
     else if (value.modificado) {
        style = { backgroundColor: 'lightblue' };
        iconos = <TableCell>
            <IconButton size="small" onClick={() => undoModificado(value)}>
                < UndoIcon />
            </IconButton>
        </TableCell>

    }  else {
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
            {value.codigo + value.numero}
        </TableCell>
        <TableCell>
            {value.descripcion}
        </TableCell>
        <TableCell>
            {value.cantidad_requerida}
        </TableCell>
        <TableCell>
            {value.cantidad_asignada}
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
                <TableCell>Requerida</TableCell>
                <TableCell>Asignada</TableCell>


            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});




class NewEditModulo extends Component {
    state = {
        modulos: [],
        open: false,
        rowEditInsumo: null,
        detalleModulos: [],
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
        disableAllButtons: false,
        isLoading: false
    }

    constructor(props) {
        super(props);
        this.buscarRef = React.createRef();

        this.detalleModulos = [];
        this.copiaDetalleModulos = [];


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
        formIsValidAlt = this.detalleModulos.length > 0 && formIsValidAlt;

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt
        })
    }



    handleSubmitEditModulo = (event) => {
        event.preventDefault();

        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
            let detalleEdit = this.detalleModulos.filter(elem => {
                if (elem.modificado || elem.eliminado || elem.insertado)
                    return true;

                    return false;
            })

            Database.post('/update-modulo', {
                //fechaIdentificador: moment(event.target[0].value, "MM/DD/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                chasis: this.state.orderForm.chasis.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: this.detalleModulos,
                id: this.props.match.params.idModulo
            },this)
                .then(res => {

                        // this.setState({pedidoInsertado: true});
                        // this.props.getIngresos();
                        // toast.success("Nueva plantilla creada");
                        this.props.getModulos();
                        this.props.history.push("/admin/modulos");

                }, err => {
                    toast.error(err.message);

                })
        }
    }

    handleSubmitNewModulo = (event) => {
        event.preventDefault();
        // alert("1: " + event.target[0].value + " 2: " + event.target[1].value  + " 3: " + event.target[2].value  + " 4: " + event.target[3].value);
        if (this.state.formIsValid) {
            this.setState({ disableAllButtons: true });
            Database.post('/insert-modulo', {
                //fechaIdentificador: moment(event.target[0].value, "MM/DD/YYYY").format("YYYY-MM-DD"), //var date = Date.parse(this.props.date.toString());
                chasis: this.state.orderForm.chasis.value,
                descripcion: this.state.orderForm.descripcion.value,
                detalle: this.state.detalleModulos
            },this)
                .then(res => {
                        // this.setState({pedidoInsertado: true});
                        // this.props.getIngresos();

                        toast.success("Nuevo módulo creado");
                        this.props.getModulos();
                        this.props.history.push("/admin/modulos");

                },err => {
                  this.setState({ disableAllButtons: false });
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
        this.setState({ open: true, rowEditInsumo: null });
    }

    closeDialog() {
        this.setState({ open: false,openPlantillaDialog:false });
    }

    onClickInsumo = (rowInsumo, cantidad) => {
        this.closeDialog();
        let detalleModulos;
        let resultado = { ...rowInsumo };



        if (this.state.rowEditInsumo) {
          if(!resultado.insertado){
            resultado.cantidadAnterior = resultado.cantidad_requerida
            resultado.modificado = true;
          }
          resultado.cantidad_requerida = cantidad;
            let indexEncontrado = this.detalleModulos.indexOf(rowInsumo);
            if (indexEncontrado >= 0) {
                this.detalleModulos[indexEncontrado] = resultado
            }
        } else {
            let indexInsumo;
            indexInsumo = this.detalleModulos.findIndex(elem => {
                if (rowInsumo.id == elem.id)
                    return true;

                return false
            })
            if (indexInsumo > -1) {
                toast.error("El Insumo se encuentra en el Módulo");
            } else {
                resultado.cantidad_requerida = cantidad;
                resultado.insertado = true;
                this.detalleModulos = this.detalleModulos.concat(resultado);
            }
        }
        detalleModulos = [...this.detalleModulos];

        this.setState({
            detalleModulos: detalleModulos
        }, () => {
            this.buscarInsumo(this.buscarRef.current.value);
            this.inputChangedHandler()
        })



    }




    getInsumosParcial = (idModulo) => {
        this.setState({ isLoading: true });
        Database.get('/list-modulos-insumos/' + idModulo,this)
            .then(res => {
                this.setState({ isLoading: false });

                    let orderForm = { ...this.state.orderForm };
                    let objModulo = null;
                    if (res.modulo.length == 1) {
                        objModulo = res.modulo[0];

                        for (let key in orderForm) {
                            if (objModulo[key]) {
                                orderForm[key]['value'] = objModulo[key];
                                orderForm[key]['touched'] = false;
                                orderForm[key]['valid'] = true;
                            }
                        }

                    }

                    this.detalleModulos = [...res.insumos];
                    this.copiaDetalleModulos = JSON.parse(JSON.stringify(res.insumos));

                    this.setState({
                        orderForm: orderForm,
                        detalleModulos: res.insumos
                    }, () => {
                        this.inputChangedHandler();
                    })

            },err => {
              toast.error(err.message);
            })
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
      event.preventDefault();
      this.closeDialog();
      let insumos =this.state.detalleSelectPlantilla.filter(elem => {
        let findIndex = this.detalleModulos.findIndex(elemFind =>{
          return (elem.id == elemFind.id)
        })
        if(findIndex > -1)
          return false
          else
          return true;


      })


               insumos = insumos.map(elem => {
                let cantidad = elem.cantidad;
                delete elem.cantidad;
                return {
                  ...elem,
                  insertado:true,
                  cantidad_requerida:cantidad
                }
              })


              if(insumos.length < this.state.detalleSelectPlantilla.length)
                toast.info("algunos insumos duplicados no se agregaron");

              this.detalleModulos = insumos.concat(this.detalleModulos);
              this.buscarInsumo(this.buscarRef.current.value);
              this.inputChangedHandler(null,null);





    }

    RowPlantilla(props) {
      const { index, style } = props;

      return (
        <ListItem button style={style} key={index}>
          <ListItemText primary={this.state.detalleSelectPlantilla[index].descripcion} secondary={this.state.detalleSelectPlantilla[index].codigo} />

          <span>{ this.state.detalleSelectPlantilla[index].cantidad }</span>

        </ListItem>
      );
    }

    deleteInsumo = (rowData) => {
        let resultado = { ...rowData };
        let indexDelete = this.detalleModulos.indexOf(rowData);
        resultado.eliminado = true;
        this.detalleModulos[indexDelete] = resultado;

        // detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);
        // this.detallePlantillas.splice(detallePlantillas.indexOf(rowData), 1);


            this.inputChangedHandler()
            this.buscarInsumo(this.buscarRef.current.value);


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
        let indexEliminado = this.detalleModulos.indexOf(rowData);
        this.detalleModulos[indexEliminado] = resultado;

            this.inputChangedHandler()
            this.buscarInsumo(this.buscarRef.current.value);


    }

    undoModificado = (rowData) => {
        let resultado = { ...rowData };
        resultado.modificado = null;
        resultado.cantidad_requerida = resultado.cantidadAnterior;
        resultado.cantidadAnterior = null;
        let indexEliminado = this.detalleModulos.indexOf(rowData);
        this.detalleModulos[indexEliminado] = resultado;

            this.inputChangedHandler()
            this.buscarInsumo(this.buscarRef.current.value);


    }

    undoInsertado = (rowData) => {
        let indexEliminado = this.detalleModulos.indexOf(rowData);
        this.detalleModulos.splice(indexEliminado, 1);

            this.inputChangedHandler()
            this.buscarInsumo(this.buscarRef.current.value);


    }

    onSortEnd = ({oldIndex, newIndex}) => {
        if (this.detalleModulos.length == this.state.detalleModulos.length) {
            this.detalleModulos = arrayMove(this.detalleModulos, oldIndex, newIndex);
            this.setState(({detalleModulos}) => ({
                detalleModulos: arrayMove(detalleModulos, oldIndex, newIndex),
            }));
        }
    };

    buscarInsumo = (value) => {
        let detalle;
        if (value && value != '') {
            detalle = this.detalleModulos.filter(elem => {
                if (elem.descripcion.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                    return true;

                return false;

            })
        } else {
            detalle = this.detalleModulos
        }

        this.setState({
            detalleModulos: detalle
        })


    }


    componentDidMount() {


        if (this.props.match.params.idModulo)
            this.getInsumosParcial(this.props.match.params.idModulo)
            

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
        return ([
            <form onSubmit={(event) => {
                if (this.props.match.params.idModulo)
                    this.handleSubmitEditModulo(event);
                else
                    this.handleSubmitNewModulo(event);
            } }>
                <GridContainer>


                    <GridItem xs={12} sm={12} md={12} >
                        <Card>
                            {this.props.match.params.idModulo ?
                                <CardHeader color="primary">
                                    <h4 className={this.props.classes.cardTitleWhite} >Modificar Módulo '{ this.state.orderForm.chasis.value }'</h4>
                                    <p className={this.props.classes.cardCategoryWhite} >
                                        Modificación de módulo
                                  </p>
                                </CardHeader> :
                                <CardHeader color="primary">
                                    <h4 className={this.props.classes.cardTitleWhite} >Nuevo Módulo</h4>
                                    <p className={this.props.classes.cardCategoryWhite} >
                                        Creación de módulos
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
                                <Button style={{ marginTop: '3.5em', marginBottom: '3.5em' }} color="info" disabled={this.state.disableAllButtons} onClick={this.openPlantilla.bind(this)} ><AssignmentIcon /> Plantilla</Button>

                                <CSVLink data={this.detalleModulos} headers={headers}>
                                    <Button color="info" >Descargar csv</Button>
                                </CSVLink>
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
                                    {this.state.detalleModulos.map((elem, index) => (
                                        <SortableItem key={`item-${index}`} index={index} value={elem} deleteInsumo={this.deleteInsumo} editInsumo={this.editInsumo} undoDelete={this.undoDelete} undoInsertado={this.undoInsertado} undoModificado={this.undoModificado} />
                                    ))}


                                </SortableContainer>
                                {this.state.isLoading  &&
                                    <div style={{ textAlign: 'center' }}>
                                        <CircularProgress />
                                    </div>

                                }
                                <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/modulos')} ><ArrowBack />Volver</Button> <Button style={{ marginTop: '25px' }} color="primary" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>

                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>
                  </ form >,
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
                      <ButtonMat onClick={this.closeDialog.bind(this)} style={{marginRight:'10px'}}>Cancelar</ButtonMat>
                      <ButtonMat type="submit" disabled={this.state.detalleSelectPlantilla.length <= 0} variant="contained" color="primary"  >
                          Seleccionar
                        </ButtonMat>
                        </ div>
                        </form>
                    </DialogContent>
                </Dialog>

        ]);
    }
}


export default withRouter(withStyles(styles)(NewEditModulo));
