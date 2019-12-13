import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';
import moment from 'moment';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
//import ModalDelete from "./ModalDelete";
//import EditCosto from "./components/EditCosto";
import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
//import NewCosto from './NewCosto';

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

class AlertaCostos extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getInsumos = () => {
    this.setState({
      isLoading:true
    })
    axios.get('/list-insumos-alertados')
      .then(res => {
        this.setState({
          isLoading:false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result[0]];
          resultado = resultado.map(elem=>{
            return {
              ...elem,
              identificador:elem.codigo + elem.numero,
              fecha_actualizacion_costo: moment(elem.fecha_actualizacion_costo).format("DD/MM/YYYY"),
            }

          })
          this.setState({
            costos: resultado
          })
        } else if (res.data.success == 3 || res.data.success == 4) {

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

  /*
  handleDelete(rowData) {
    if (rowData.id) {
      axios.post('/delete-costos', {
        id: rowData.id
      })
        .then(res => {
          if (res.data.success == 1) {
            this.handleClose();
            this.getInsumos();
            toast.success("Costo eliminado");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }*/

  componentDidMount() {

    this.getInsumos();

  }


  reloadCostos = () => {
    this.getInsumos();
  }


  render() {
   let style={  maxWidth: "100%"}
    if(this.props.match.url != this.props.location.pathname) {
      style={ display:'none', maxWidth: "100%"}
    }
    return ([
       <div key={"costos-list-costos"} style={style}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >ALERTAS DE COSTOS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Alertas de Costos de Insumos
                      </p>
              </CardHeader>
              <CardBody>
                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.costos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Costo',
                    onClick: (event, rowData) => this.props.history.push('/admin/costos/editarcosto/' + rowData.id)
                  }]}
                  options={{
                    exportButton: true,
                    exportAllData:true,
                    exportFileName:"AlertaCostos " + moment().format("DD-MM-YYYY"),
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


export default withStyles(styles)(AlertaCostos);
