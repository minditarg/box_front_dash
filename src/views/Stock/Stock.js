import React, { Component } from "react";
import Database from "variables/Database.js";
//import io from 'socket.io-client';
import { Route, Switch, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import moment from 'moment';
import ExportXLS from 'components/ExportXLS/ExportXLS';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DetalleStock from './components/DetalleStock';
import { Event } from 'react-socket-io';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable, { MTableCell, MTableBodyRow } from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
//import ModalDelete from "./ModalDelete";
//import EditInsumo from "./components/EditInsumo";

import { ColumnsListado, StateListado } from "./VariablesState";

import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import { localization } from "variables/general.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';

const styles = {
  rowTable: {
    "&:hover": {
      backgroundColor: "lightgray"
    }
  },
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



const ColumnsListadoDetalle = [
  { title: "Descripcion", field: "descripcion" },
  { title: "Cantidad", field: "cantidad" },
  { title: "Identificador", field: "identificador" },
 
  { title: "Usuario", field: "username" },
  { title: "Minimo", field: "minimo" },
  { title: "Stock Parc", field: "parcial" },
  { title: "Fecha", field: "fecha" , customSort: (a, b) => moment(a.fecha,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - moment(b.fecha,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm"), cellStyle:{ minWidth:'120px' } },

];




class Stock extends Component {
  state = { ...StateListado };


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  closeDialog() {
    this.setState({
      openMovimientos: false,
    })

  }

  getInsumos = () => {
    this.setState({
      isLoading: true
    })
    Database.get('/list-insumos',this,null,true)
      .then(res => {

          let resultado = [...res.result];
          resultado = resultado.map(elem=>{
            return {
              ...elem,
              identificador: elem.codigo + elem.numero
            }

          })
          this.setState({
            insumos: resultado,
            isLoading: false
          })

        }, err => {
        this.setState({
          isLoading: false
        })
        toast.error(err.message);
      })
  }

  handleClickOpen(rowData) {
    this.setState({
      openDeleteDialog: true,
      deleteRowData: rowData
    })
  }

  handleClose() {
    this.setState({
      openDeleteDialog: false,
      deleteRowData: null
    })
  }

  //   handleDelete(rowData) {
  //     if(rowData.id) {
  //     axios.post('/delete-insumos', {
  //             id:rowData.id
  //     })
  //       .then(res => {
  //         if (res.data.success == 1) {
  //           this.handleClose();
  //          this.getInsumos();
  //          toast.success("Insumo eliminado");
  //         }
  //       },err =>{
  //         toast.error(err.message);
  //       })
  //     }

  //   }

  componentDidMount() {
    this.getInsumos();
    /*let socket = io('/');

    socket.on('connect', function(){
      console.log("conectado al socket");
    });
    socket.on('disconnect', function(){
      console.log("desconectado al socket");
    });
    socket.on('reconnect_attempt', function(){
      console.log("intentado reconectar");
    }); */

  }





  getInsumoEdit = (id) => {
    Database.get('/list-insumos/' + id,this)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              insumoEdit: resultado.result[0]
            })

            let editInsumoFormAlt = { ...this.state.editInsumoForm };
            editInsumoFormAlt.codigo.value = resultado.result[0].codigo;
            editInsumoFormAlt.descripcion.value = resultado.result[0].descripcion;
            editInsumoFormAlt.unidad.value = resultado.result[0].unidad;
            editInsumoFormAlt.minimo.value = resultado.result[0].minimo;
            editInsumoFormAlt.stock.value = resultado.result[0].stock;

            for (let key in editInsumoFormAlt) {
              editInsumoFormAlt[key].touched = true;
              editInsumoFormAlt[key].valid = true;
            }
            this.setState({
              editInsumoForm: editInsumoFormAlt
            })
          }
          else {
            this.setState({
              insumoEdit: null
            })
          }

      },err => {
        toast.error(err.message);
      })
  }

  handleSubmitEditInsumo = (event) => {

    event.preventDefault();
    Database.post(`/update-insumos`, { id: this.state.insumoEdit.id, codigo: this.state.editInsumoForm.codigo.value, descripcion: this.state.editInsumoForm.descripcion.value, unidad: this.state.editInsumoForm.unidad.value, minimo: this.state.editInsumoForm.minimo.value },this)
      .then(res => {

          this.setState({
            editFormIsValid: false
          })
          toast.success("Los cambios se realizaron correctamente");

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




  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editInsumoForm
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
      editInsumoForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }


  editSingleInsumo = value => {
    this.props.history.push(this.props.match.url + '/editarinsumo/' + value);
  }


  resetEditForm = () => {
    let editInsumoFormAlt = { ...this.state.editInsumoForm };
    for (let key in editInsumoFormAlt) {
      editInsumoFormAlt[key].value = ''
    }

    this.setState({
      editInsumoForm: editInsumoFormAlt,
      editFormIsValid: false
    })


  }

  reloadInsumos = () => {
    this.getInsumos();
  }

  openClickDetalleMovimientos(rowData) {
    console.log(rowData);
    this.setState({
      openMovimientos:true,
      insumoMovimientos:[],
      detalleInsumoMoviento:rowData
    })

    Database.get('/detalle-stock/' + rowData.id ,this).then(res => {
      console.log(res.result)
      let resultado = res.result;

      resultado = resultado.map(elem => {
        let identificador;
        if(elem.id_entrega) {
          identificador = elem.descripcion_id + elem.id_entrega;
        } else if(elem.id_ingreso) {
          identificador = elem.descripcion_id + elem.id_ingreso;
        } else if(elem.id_devolucion) {
            identificador = elem.descripcion_id + elem.id_devolucion;
        }
        
        return {
          ...elem,
          identificador:identificador,
          fecha: moment(elem.fecha).format("DD/MM/YYYY HH:mm")
        }
      })

      console.log(resultado)
      this.setState({
        insumoMovimientos: resultado
      })
  },err => {
    toast.error(err.message);
  })
   

  }


  render() {

    return ([
      <Switch key={"stock-switch"}>
        <Route path={this.props.match.url} exact render={() =>
          <div style={{ maxWidth: "100%" }}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >STOCK</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Insumos
                      </p>
              </CardHeader>
              <CardBody>
              <ExportXLS csvData={this.state.insumos} fileName={"Stock - " +  moment(Date.now()).format("DD_MM_YYYY")} header={ColumnsListado} />
              
              
                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.insumos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'description',
                    tooltip: 'Detalle Movimientos de insumo',
                    //onClick: (event, rowData) => <ExportXLS csvData={this.state.insumos} fileName={"Stock - " +  moment(Date.now()).format("DD_MM_YYYY")} header={ColumnsListado} />
                    onClick: (event, rowData) => this.openClickDetalleMovimientos(rowData)
                  }]}
                  components={{
                    Cell: props => {
                      let styles = null
                      if (props.columnDef.field == 'cantidad') {
                        if (props.rowData.cantidad - props.rowData.minimo < 0) {
                          styles = { backgroundColor: red[700], color: 'white' }
                        } else {
                          styles = { backgroundColor: lightGreen[500], color: 'white' }
                        }
                      }
                      return (

                        <MTableCell style={styles} {...props} />

                      )
                    },
                    Row: props => {
                      return (
                        <MTableBodyRow className={this.props.classes.rowTable} {...props} />

                      )

                    },
                    Container: props => (
                      <Paper elevation={0} {...props} />
                    )
                  }}
                  
                  options={{
                    exportButton: true,
                    exportAllData:true,
                    exportFileName:"Stock " + moment().format("DD-MM-YYYY"),
                    exportDelimiter:";",
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}

                  detailPanel={rowData => {
                    return (
                      <DetalleStock idInsumo={rowData.id} cantidadRegistros="7" />
                    )
                  } }
                  // actions={[ {
                  //     icon: 'edit',
                  //     tooltip: 'Edit User',
                  //     onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarinsumo/' + rowData.id)
                  //   },
                  //   {
                  //     icon: 'delete',
                  //     tooltip: 'Delete User',
                  //     onClick: (event, rowData) => this.deleteMaterial(rowData)
                  //   }]}
                  />
              </CardBody>
            </Card>
          </div>} />

      </Switch>,
       <Event event='actualizar_stock' handler={() => console.log("actualizo stock")} />,
       <Dialog
       open={this.state.openMovimientos}
       onClose={this.closeDialog.bind(this)}
       fullWidth={true}
       maxWidth={"xl"}
       >
       <DialogTitle>Detalle de Movimientos Insumo 
                           <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
           <CloseIcon />
         </IconButton>
       </DialogTitle>


       <DialogContent>
                <p>Identificador: <b>{this.state.detalleInsumoMoviento && this.state.detalleInsumoMoviento.identificador}</b><br/>
           Descripcion: <b>{this.state.detalleInsumoMoviento && this.state.detalleInsumoMoviento.descripcion}</b><br/>
           Unidad: <b>{this.state.detalleInsumoMoviento && this.state.detalleInsumoMoviento.unidad}</b></p>
         
           <ExportXLS csvData={this.state.insumoMovimientos} fileName={"Movimientos Insumo - " +  (this.state.detalleInsumoMoviento ? this.state.detalleInsumoMoviento.identificador : null )  + " - " + moment(Date.now()).format("DD_MM_YYYY")} header={ColumnsListadoDetalle} />
         <MaterialTable
           isLoading={this.state.isLoadingDetalle}
           columns={ColumnsListadoDetalle}
           data={this.state.insumoMovimientos}
           title=""
           localization={localization}
          
           options={{
             exportButton: false,
             headerStyle: {
               backgroundColor: lightGreen[700],
               color: '#FFF'
             },
           }}
           />
       </DialogContent>
     </Dialog>



    ]);
  }
}


export default withStyles(styles)(Stock);
