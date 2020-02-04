import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import Equalizer from '@material-ui/icons/Equalizer';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import NewEditModulo from './components/NewEditModulo';
import ModulosAnalisisDetalle from './ModulosAnalisisDetalle';

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



class ModulosAnalisis extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getModulos = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos',this,null,true)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'MO' + elem.id
            }
          })
          this.setState({
            modulos: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
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

  handleDelete(rowData) {
    if (rowData.id) {
      Database.post('/delete-modulo', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleClose();
            this.getModulos();
            toast.success("Modulo eliminado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {

    this.getModulos();

  }


  reloadModulos = () => {
    this.getModulos();
  }


  render() {
   let style={  maxWidth: "100%"}
    if(this.props.match.url != this.props.location.pathname) {
      style={ display:'none', maxWidth: "100%"}
    }
    return ([
       <div key={"modulos-list-plantillas"} style={style}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >MÓDULOS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Análisis de Módulos
                      </p>
              </CardHeader>
              <CardBody>
                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'equalizer',
                    tooltip: 'Analizar Módulo',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/analizarmodulo/' + rowData.id)
                  }]}
                  options={{
                    exportButton: true,
                    exportAllData:true,
                    exportFileName:"Analisis " + moment().format("DD-MM-YYYY"),
                    exportDelimiter:";",
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}
                />
              </CardBody>
            </Card>

          </div>,
      <Switch  key={"modulos-switch"}>

        <Route path={this.props.match.url + "/editarmodulo/:idModulo"} exact render={() =>

          <NewEditModulo getModulos={()=>this.getModulos()}    />
        } />

        <Route path={this.props.match.url + "/analizarmodulo/:idModulo"} exact render={() =>

        <ModulosAnalisisDetalle getModulos={()=>this.getModulos()}    />
        } />

          <Route path={this.props.match.url + "/nuevomodulo/"} exact render={() =>

            <NewEditModulo  getModulos={()=>this.getModulos()}    />
        } />

      </Switch>,


    ]);
  }
}


export default withStyles(styles)(ModulosAnalisis);
