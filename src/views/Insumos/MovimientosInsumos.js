import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link } from 'react-router-dom';
import moment from 'moment';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable,  {  MTableBodyRow }  from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
import Button from "components/CustomButtons/Button.js";

import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';



import { withStyles } from '@material-ui/styles';

const styles = {
  rowTable: {

      backgroundColor: lightGreen[200]

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


const ColumnsListado = [
  { title: "Fecha", field: "fecha" , customSort: (a, b) => moment(a.fecha,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - moment(b.fecha,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm"), cellStyle:{ minWidth:'120px' } },
/*  { title: "Identificador", field: "identificador", customSort: (a, b) => a.id - b.id }, */
  { title: "Movimiento", field: "descripcion_movimientos" },

  { title: "Ident. Insumo", field: "identificador_insumo" },
  { title: "Descripción", field: "descripcion",cellStyle:{ minWidth:'300px' } },
  { title: "Mínimo", field: "minimo" },
    { title: "Unidad", field: "unidad" },
    { title: "Alertar", field: "alertar" },
    { title: "Autorizar", field: "autorizar" },
    { title: "Usuario", field: "nombre",cellStyle:{ minWidth:'100px' } },


];


const ColumnsListadoDetalle = [
  { title: "Identificador", field: "identificador", customSort: (a, b) => a.id - b.id },
  { title: "Descripcion", field: "descripcion" },
  { title: "Requerido", field: "cantidad_requerida", editable: 'never' },
  { title: "Asignada", field: "cantidad_asignada", editable: 'never' },
  { title: "Stock", field: "cantidad_stock", editable: 'never' },
  { title: "Disponible Entrega", field: "disponible", editable: 'never' },
];

class MovimientosInsumos extends Component {
  state = {
    movimientos: [],
    isLoading: false


  }


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getMovimientos = () => {
    this.setState({
      isLoading: true
    })
    Database.get('/list-insumos-movimientos',this,null,true)
      .then(res => {

          let resultado = [...res.result];

          resultado = resultado.map(elem => {
            let referencia = null;
              if(elem.id_ingreso)
                referencia = elem.descripcion_id_movimientos + elem.id_ingreso
                else if(elem.id_entrega)
                  referencia = elem.descripcion_id_movimientos + elem.id_entrega
                  else if(elem.id_devolucion)
                    referencia = elem.descripcion_id_movimientos + elem.id_devolucion;
            return {
              ...elem,
              identificador: 'MOV' + elem.id,
              referencia:referencia,
              identificador_insumo: elem.codigo + elem.numero,
              fecha: moment(elem.fecha).format("DD/MM/YYYY HH:mm"),
              autorizar: elem.autorizar ? "Si" : "No",
              alertar: elem.alertar ? "Si" : "No"
            }
          })
          this.setState({
            movimientos: resultado,
            isLoading: false
          })

      }, err => {
        this.setState({
          isLoading: false
        })
        toast.error(err.message);
      })
  }





  componentDidMount() {
    this.getMovimientos();

  }


  reloadMovimientos = () => {
    this.getMovimientos();
  }


  render() {
    let style = { maxWidth: "100%" }
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none', maxWidth: "100%" }
    }
    return ([
      <div key={"movimientos-list"} style={style}>
        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >MOVIMIENTOS STOCK</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de movimientos de insumos en Stock
                      </p>
          </CardHeader>
          <CardBody>

            <MaterialTable
              isLoading={this.state.isLoading}
              columns={ColumnsListado}
              data={this.state.movimientos}
              title=""
              localization={localization}
              components={{

                     Row: props => {
                       let clase=null;
                       if(props.data.cantidadInsumosDisponibles > 0)
                         clase = this.props.classes.rowTable;
                       return (
                         <MTableBodyRow  className={clase} {...props}   />
                       )
                     }
                   }}

              options={{
                pageSize:10,
                exportButton: true,
                exportAllData:true,
                exportFileName:"Insumos Auditoria " + moment().format("DD-MM-YYYY"),
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


export default withStyles(styles)(MovimientosInsumos);
