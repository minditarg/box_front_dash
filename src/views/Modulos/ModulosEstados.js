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
import ModalProducir from "./ModalProducir";
import ModalFinalizarProduccion from "./ModalFinalizarProduccion";
import ModalCancelarProduccion from "./ModalCancelarProduccion";
import ModalPausarProduccion from "./ModalPausarProduccion";
import ModalDisenoaProducir from "./ModalDisenoaProducir";

import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import Category from '@material-ui/icons/Category';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import Pause from '@material-ui/icons/Pause';
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

  disenoaProducirModulo = (rowData) => {
    this.handleDisenoaProducir(rowData);
  }

  pausarProduccion = (rowData) => {
    this.handleClickPausarProduccion(rowData);
  }

  finalizarProduccion = (rowData) => {
    this.handleClickFinalizarProduccion(rowData);
  }

  cancelarProduccion = (rowData) => {
    this.handleClickCancelarProduccion(rowData);
  }

  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getModulos = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos-produccion',this)
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


  getModulosDiseno = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos-diseno',this)
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
            modulosdiseno: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }

  getModulosFinalizarProduccion = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos-finalizados',this)
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
            modulosFinalizados: resultado
          })


      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getModulosPausados = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos-pausados',this)
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
            modulosPausados: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getModulosCancelados = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-modulos-cancelados',this)
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
            modulosCancelados: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }

  handleClickCancelarProduccion(rowData) {
    this.setState({
      openCancelarProduccionDialog: true,
      cancelarProduccionRowData: rowData
    })
  }

  handleClickPausarProduccion(rowData) {
    this.setState({
      openPausarProduccionDialog: true,
      pausarProduccionRowData: rowData
    })
  }

  handleClickFinalizarProduccion(rowData) {
    this.setState({
      openFinalizarProduccionDialog: true,
      finalizarProduccionRowData: rowData
    })
  }

  handleClickOpenProducir(rowData) {
    this.setState({
      openProducirDialog: true,
      producirRowData: rowData
    })
  }

  handleCloseFinalizarProduccion() {
    this.setState({
      openFinalizarProduccionDialog: false,
      finalizarProduccionRowData: null
    })
  }


  handleClosePausarProduccion() {
    this.setState({
      openPausarProduccionDialog: false,
      pausarProduccionRowData: null
    })
  }

  handleCloseCancelarProduccion() {
    this.setState({
      openCancelarProduccionDialog: false,
      cancelarProduccionRowData: null
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

  handlePausarProduccion(rowData) {
    if (rowData.id) {
      Database.post('/pausar-modulo', {
        id: rowData.id
      },this)
        .then(res => {
            this.handleClosePausarProduccion();
           // this.getModulosCancelados();
            this.getModulos();
            this.getModulosPausados();
            toast.success("Modulo pausado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleCancelarProduccion(rowData) {
    if (rowData.id) {
      Database.post('/cancelar-modulo', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseCancelarProduccion();
            this.getModulosCancelados();
            this.getModulos();
            this.getModulosPausados();
            toast.success("Modulo cancelado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleFinalizarProduccion(rowData) {
    if (rowData.id) {
      Database.post('/finalizar-modulo', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseFinalizarProduccion();
            this.getModulosFinalizarProduccion();
            this.getModulos();
            toast.success("Modulo finalizado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleDisenoaProducir(rowData) {
    if (rowData.id) {
      Database.post('/disenoaproducir-modulo', {
        id: rowData.id
      },this)
        .then(res => {
          if (res.data.success == 1) {
            this.handleCloseProducir();
            this.getModulosDiseno();
            this.getModulosPausados();
            this.getModulos();
            toast.success("Modulo enviado a Producción");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleProducir(rowData) {
    if (rowData.id) {
      Database.post('/producir-modulo', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseProducir();
            this.getModulosDiseno();
            this.getModulosPausados();
            this.getModulos();
            toast.success("Modulo enviado a Producción");

        }, err => {
          toast.error(err.message);
        })
    }

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

    this.getModulosDiseno();

    this.getModulosFinalizarProduccion();

    this.getModulosCancelados();

    this.getModulosPausados();

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
                    onClick: (event, rowData) => this.disenoaProducirModulo(rowData)
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
                    tooltip: 'Finalizar Produccion',
                    onClick: (event, rowData) => this.finalizarProduccion(rowData)
                  },
                  {
                    icon: 'pause',
                    tooltip: 'Pausar Produccion',
                    onClick: (event, rowData) => this.pausarProduccion(rowData)
                  },
                  {
                    icon: 'close',
                    tooltip: 'Cancelar Produccion',
                    onClick: (event, rowData) => this.cancelarProduccion(rowData)
                  }
                ]}
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
                tabName: "Pausados",
                tabIcon: Pause,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulosPausados}
                  title=""
                  localization={localization}
                  actions={[
                    {
                      icon: 'category',
                      tooltip: 'Producir',
                      onClick: (event, rowData) => this.producirModulo(rowData)
                    },
                    {
                      icon: 'close',
                      tooltip: 'Cancelar Produccion',
                      onClick: (event, rowData) => this.cancelarProduccion(rowData)
                    }
                  ]}
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
                tabName: "Finalizados",
                tabIcon: Done,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulosFinalizados}
                  title=""
                  localization={localization}
                  actions={[

                  ]}
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
                tabName: "Cancelados",
                tabIcon: Close,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.modulosCancelados}
                  title=""
                  localization={localization}
                  actions={[

                  ]}
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
      <ModalDisenoaProducir
      key={"modulos-modalDisenoaProducir"}
        openProducirDialog={this.state.openProducirDialog}
        producirRowData={this.state.producirRowData}

        handleCloseProducir={() => this.handleCloseProducir()}
        handleDisenoaProducir={(rowData) => this.handleDisenoaProducir(rowData)}
      />,
      <ModalProducir
      key={"modulos-modalProducir"}
        openProducirDialog={this.state.openProducirDialog}
        producirRowData={this.state.producirRowData}

        handleCloseProducir={() => this.handleCloseProducir()}
        handleProducir={(rowData) => this.handleProducir(rowData)}
      />,
      <ModalFinalizarProduccion
      key={"modulos-modalFinalizarProduccion"}
        openFinalizarProduccionDialog={this.state.openFinalizarProduccionDialog}
        finalizarProduccionRowData={this.state.finalizarProduccionRowData}

        handleCloseFinalizarProduccion={() => this.handleCloseFinalizarProduccion()}
        handleFinalizarProduccion={(rowData) => this.handleFinalizarProduccion(rowData)}
      />,
      <ModalCancelarProduccion
      key={"modulos-modalCancelarProduccion"}
        openCancelarProduccionDialog={this.state.openCancelarProduccionDialog}
        cancelarProduccionRowData={this.state.cancelarProduccionRowData}

        handleCloseCancelarProduccion={() => this.handleCloseCancelarProduccion()}
        handleCancelarProduccion={(rowData) => this.handleCancelarProduccion(rowData)}
      />,
      <ModalPausarProduccion
      key={"modulos-modalPausarProduccion"}
        openPausarProduccionDialog={this.state.openPausarProduccionDialog}
        pausarProduccionRowData={this.state.pausarProduccionRowData}

        handleClosePausarProduccion={() => this.handleClosePausarProduccion()}
        handlePausarProduccion={(rowData) => this.handlePausarProduccion(rowData)}
      />

    ]);
  }
}


export default withStyles(styles)(ModulosEstados);
