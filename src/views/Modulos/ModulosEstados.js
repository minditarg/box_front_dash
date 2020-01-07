import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import ModalProducir from "./ModalProducir";
import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import Category from '@material-ui/icons/Category';
import Description from '@material-ui/icons/Description';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import NewEditModulo from './components/NewEditModulo';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";

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



class ModulosEstados extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  producirModulo = (rowData) => {
    this.handleClickOpenProducir(rowData);
  }

  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getModulos = () => {
    this.setState({
      isLoading:true
    })
    axios.get('/list-modulos-produccion')
      .then(res => {
        this.setState({
          isLoading:false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'MO' + elem.id
            }
          })
          this.setState({
            modulos: resultado
          })
        } else if (res.data.success == 3 || res.data.success == 4) {

        }

      }, err => {
        toast.error(err.message);
      })
  }


  getModulosDiseno = () => {
    this.setState({
      isLoading:true
    })
    axios.get('/list-modulos-diseno')
      .then(res => {
        this.setState({
          isLoading:false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'MO' + elem.id
            }
          })
          this.setState({
            modulosdiseno: resultado
          })
        } else if (res.data.success == 3 || res.data.success == 4) {

        }

      }, err => {
        toast.error(err.message);
      })
  }


  handleClickOpenProducir(rowData) {
    this.setState({
      openProducirDialog: true,
      producirRowData: rowData
    })
  }

  handleCloseProducir() {
    this.setState({
      openProducirDialog: false,
      producirRowData: null
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

  handleProducir(rowData) {
    if (rowData.id) {
      axios.post('/producir-modulo', {
        id: rowData.id
      })
        .then(res => {
          if (res.data.success == 1) {
            this.handleCloseProducir();
            this.getModulosDiseno();
            this.getModulos();
            toast.success("Modulo enviado a Producción");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleDelete(rowData) {
    if (rowData.id) {
      axios.post('/delete-modulo', {
        id: rowData.id
      })
        .then(res => {
          if (res.data.success == 1) {
            this.handleClose();
            this.getModulos();
            toast.success("Modulo eliminado");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {
  
    this.getModulos();

    this.getModulosDiseno();

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


          <CustomTabs
            title="Modulos:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Diseño",
                tabIcon: Description,
                tabContent: (
                  
                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulosdiseno}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Módulo',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarmodulo/' + rowData.id)
                  },
                  {
                    icon: 'category',
                    tooltip: 'Producir',
                    onClick: (event, rowData) => this.producirModulo(rowData)
                  }]}
                  options={{
                    exportButton: true,
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}
                />
              
                )
              },
              {
                tabName: "Producción",
                tabIcon: Category,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Módulo',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarmodulo/' + rowData.id)
                  },
                  {
                    icon: 'done',
                    tooltip: 'Borrar Módulo',
                    onClick: (event, rowData) => this.deleteMaterial(rowData)
                  }]}
                  options={{
                    exportButton: true,
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}
                />
                )
              }
            ]}
          />
          </div>,
      <Switch  key={"modulos-switch"}>

        <Route path={this.props.match.url + "/editarmodulo/:idModulo"} exact render={() =>

          <NewEditModulo getModulos={()=>this.getModulos()}    />
        } />

          <Route path={this.props.match.url + "/nuevomodulo/"} exact render={() =>

            <NewEditModulo  getModulos={()=>this.getModulos()}    />
        } />

      </Switch>,
      <ModalDelete
      key={"modulos-modal"}
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,
      <ModalProducir
      key={"modulos-modal"}
        openProducirDialog={this.state.openProducirDialog}
        producirRowData={this.state.producirRowData}

        handleCloseProducir={() => this.handleCloseProducir()}
        handleProducir={(rowData) => this.handleProducir(rowData)}
      />
      ,


    ]);
  }
}


export default withStyles(styles)(ModulosEstados);
