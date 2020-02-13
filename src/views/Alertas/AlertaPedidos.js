import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link } from 'react-router-dom';
import moment from 'moment';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
//import MaterialTable from "material-table";
import MaterialTable, { MTableCell, MTableBodyRow } from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';

import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import AddIcon from '@material-ui/icons/Add';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

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

class AlertaPedidos extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getInsumos = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-insumos-stock-insuficiente',this,null,true)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result[0]];
          resultado = resultado.map(elem=>{
            return {
              ...elem,
              identificador:elem.codigo + elem.numero,
              test: "hola"
            //  fecha_actualizacion_costo: moment(elem.fecha_actualizacion_costo).format("DD/MM/YYYY"),
            }

          })
          this.setState({
            pedidos: resultado
          })


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



  componentDidMount() {


    this.getInsumos();

  }


  reloadPedidos = () => {
    this.getInsumos();
  }


  render() {
   let style={  maxWidth: "100%"}
    if(this.props.match.url != this.props.location.pathname) {
      style={ display:'none', maxWidth: "100%"}
    }
    return ([
       <div key={"pedidos-list-pedidos"} style={style}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >ALERTAS DE PEDIDOS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Alertas de Pedidos
                      </p>
              </CardHeader>
              <CardBody>
                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.pedidos}
                  title=""
                  localization={localization}
                  // actions={[{
                  //   icon: 'edit',
                  //   tooltip: 'Editar Pedido',
                  //   onClick: (event, rowData) => this.props.history.push('/admin/costos/editarcosto/' + rowData.id)
                  // }]}
                  components={{
                    Cell: props => {
                      let styles = null
                      if (props.columnDef.field == 'cantidad') {
                        //if (props.rowData.cantidad - props.rowData.minimo < 0) {
                          if (props.rowData.cantidad + props.rowData.pedido - props.rowData.requerido < props.rowData.minimo) {
                          styles = { backgroundColor: red[700], color: 'white' }
                        } else {
                          styles = { backgroundColor: yellow[500], color: 'white' }
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
                    exportFileName:"AlertaPedidos " + moment().format("DD-MM-YYYY"),
                    exportDelimiter:";",
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}
                />
              </CardBody>
            </Card>

          </div>
    ]);
  }
}


export default withStyles(styles)(AlertaPedidos);
