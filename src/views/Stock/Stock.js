import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import moment from 'moment';

import DetalleStock from './components/DetalleStock';

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
  }

};


class Stock extends Component {
  state = { ...StateListado };


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getInsumos = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/list-insumos')
      .then(res => {
        this.setState({
          isLoading: false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            insumos: resultado
          })
        } else if (res.data.success == 3 || res.data.success == 4) {
          toast.error(res.data.error_msj);
          setTimeout(() => {
            this.props.history.replace('/');
          }, 3500)
        }

      }, err => {
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

  }





  getInsumoEdit = (id) => {
    axios.get('/list-insumos/' + id)
      .then(resultado => {
        if (resultado.data.success == 1) {
          if (resultado.data.result.length > 0) {
            this.setState({
              insumoEdit: resultado.data.result[0]
            })

            let editInsumoFormAlt = { ...this.state.editInsumoForm };
            editInsumoFormAlt.codigo.value = resultado.data.result[0].codigo;
            editInsumoFormAlt.descripcion.value = resultado.data.result[0].descripcion;
            editInsumoFormAlt.unidad.value = resultado.data.result[0].unidad;
            editInsumoFormAlt.minimo.value = resultado.data.result[0].minimo;
            editInsumoFormAlt.stock.value = resultado.data.result[0].stock;

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
        }
      })
  }

  handleSubmitEditInsumo = (event) => {

    event.preventDefault();
    axios.post(`/update-insumos`, { id: this.state.insumoEdit.id, codigo: this.state.editInsumoForm.codigo.value, descripcion: this.state.editInsumoForm.descripcion.value, unidad: this.state.editInsumoForm.unidad.value, minimo: this.state.editInsumoForm.minimo.value })
      .then(res => {
        let estadoAlt = null
        if (res.data.success == 0) {
          estadoAlt = false
        }
        if (res.data.success == 1) {
          estadoAlt = true
        }

        if (estadoAlt) {

          this.setState({
            editFormIsValid: false
          })
          toast.success("Los cambios se realizaron correctamente");
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
                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.insumos}
                  title=""
                  localization={localization}
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

      </Switch>


    ]);
  }
}


export default withStyles(styles)(Stock);
