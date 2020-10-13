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
import ModalSolicitar from "./ModalSolicitar";
import ModalFinalizar from "./ModalFinalizar";
import ModalCancelar from "./ModalCancelar";
import ModalPausarPedido from "./ModalPausarPedido";
import ModalDisenoaSolicitar from "./ModalDisenoaSolicitar";

import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, ColumnsListadoSolicitados, StateListado } from "./VariablesState";
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
import NewPedido from './NewPedido';
import EditPedido from './components/EditPedidos';

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



class PedidosEstados extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  solicitarPedido = (rowData) => {
    this.handleClickOpenSolicitarPedido(rowData);
  }

  disenoaSolicitarPedido = (rowData) => {
    this.handleDisenoaSolicitado(rowData);
  }

  pausarPedido = (rowData) => {
    this.handleClickPausarPedido(rowData);
  }

  finalizar = (rowData) => {
  //  alert("finalizar");
    this.handleClickFinalizar(rowData);
  }

  cancelar = (rowData) => {
    this.handleClickCancelar(rowData);
  }

  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getPedidos = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-pedidos',this,null,true)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'P' + elem.id
            }
          })
          this.setState({
            pedidos: resultado
          })


      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getPedidosDiseno = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-pedidos-diseno',this)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'P' + elem.id
            }
          })
          this.setState({
            pedidosdiseno: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }

  getPedidosFinalizar = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-pedidos-finalizados',this)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'P' + elem.id
            }
          })
          this.setState({
            pedidosFinalizados: resultado
          })


      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getPedidosPausados = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-pedidos-pausados',this)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'P' + elem.id
            }
          })
          this.setState({
            pedidosPausados: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getPedidosCancelados = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-pedidos-cancelados',this)
      .then(res => {
        this.setState({
          isLoading:false
        })
          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'P' + elem.id
            }
          })
          this.setState({
            pedidosCancelados: resultado
          })

      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }

  handleClickCancelar(rowData) {
    this.setState({
      openCancelarDialog: true,
      cancelarRowData: rowData
    })
  }

    handleClickPausarPedido(rowData) {
  //    alert(rowData.id);
    this.setState({
      openPausarPedidoDialog: true,
      pausarPedidoRowData: rowData
    })
  }

  handleClickFinalizar(rowData) {
 //   alert("handleClickFinalizar");
    this.setState({
      openFinalizarDialog: true,
      finalizarRowData: rowData
    })
  }

  handleClickOpenSolicitarPedido(rowData) {
    this.setState({
      openSolicitarDialog: true,
      solicitarRowData: rowData
    })
  }

  handleCloseFinalizar() {
    this.setState({
      openFinalizarDialog: false,
      finalizarRowData: null
    })
  }


  handleClosePausarPedido() {
    this.setState({
      openPausarPedidoDialog: false,
      pausarPedidoRowData: null
    })
  }

  handleCloseCancelar() {
    this.setState({
      openCancelarDialog: false,
      cancelarRowData: null
    })
  }

  handleCloseSolicitarPedido() {
    this.setState({
      
      openSolicitarDialog: false,
      pedidoRowData: null
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

  handlePausarPedido(rowData) {
 //   alert(rowData);
   // console.log(rowData);
    if (rowData.id) {
      Database.post('/pausar-pedido', {
        id: rowData.id
      },this)
        .then(res => {
            this.handleClosePausarPedido();
           // this.getPedidosCancelados();
            this.getPedidos();
            this.getPedidosPausados();
            toast.success("Pedido pausado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleCancelar(rowData) {
    if (rowData.id) {
      Database.post('/cancelar-pedido', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseCancelar();
            this.getPedidosCancelados();
            this.getPedidos();
            this.getPedidosPausados();
            toast.success("Pedido cancelado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleFinalizar(rowData) {
  //  alert("handleFinalizar");
    if (rowData.id) {
      Database.post('/finalizar-pedido', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseFinalizar();
            this.getPedidosFinalizar();
            this.getPedidos();
            toast.success("Pedido finalizado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleDisenoaSolicitado(rowData) {
   // alert(rowData); 
    if (rowData.id) {
      Database.post('/disenoasolicitado-pedido', {
        id: rowData.id
      },this)
        .then(res => {
          if (res.success == 1) {
            this.handleCloseSolicitarPedido();
            this.getPedidosDiseno();
            this.getPedidosPausados();
            this.getPedidos();
            toast.success("Pedido enviado a Solicitado");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }

  handleSolicitarPedido(rowData) {
 //   alert("handleSolicitarPedido");
    if (rowData.id) {
      Database.post('/solicitar-pedido', {
        id: rowData.id
      },this)
        .then(res => {

            this.handleCloseSolicitarPedido();
            this.getPedidosDiseno();
            this.getPedidosPausados();
            this.getPedidos();
            toast.success("Pedido enviado a Solicitado");

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
            this.getPedidos();
            toast.success("Pedido eliminado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {

    this.getPedidos();

    this.getPedidosDiseno();

    this.getPedidosFinalizar();

    this.getPedidosCancelados();

    this.getPedidosPausados();

  }


  reloadPedidos = () => {
    this.getPedidos();
  }


  render() {
   let style={  maxWidth: "100%"}
    if(this.props.match.url != this.props.location.pathname) {
      style={ display:'none', maxWidth: "100%"}
    }
    return ([
       <div key={"modulos-list-plantillas"} style={style}>


          <CustomTabs
            title=""
            headerColor="primary"
            tabs={[
              {
                tabName: "Pedidos",
                tabIcon: Description,
                tabContent: (

                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.pedidosdiseno}
                  title=""
                  localization={localization}
                  actions={[
                    {
                    icon: 'edit',
                    tooltip: 'Editar Pedido',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarpedido/' + rowData.id)
                  },
                  {
                    icon: 'category',
                    tooltip: 'Solicitado',
                    onClick: (event, rowData) => this.disenoaSolicitarPedido(rowData)
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
                tabName: "Aprobados",
                tabIcon: Category,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListadoSolicitados}
                  data={this.state.pedidos}
                  title=""
                  localization={localization}
                  actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Pedido',
                      onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarpedido/' + rowData.id)
                    },
                  {
                    icon: 'done',
                    tooltip: 'confirmar Ingreso de pedido',
                    onClick: (event, rowData) => this.finalizar(rowData)
                  },
                  {
                    icon: 'pause',
                    tooltip: 'Pausar pedido',
                    onClick: (event, rowData) => this.pausarPedido(rowData)
                  },
                  {
                    icon: 'close',
                    tooltip: 'Cancelar pedido',
                    onClick: (event, rowData) => this.cancelar(rowData)
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
                  columns={ColumnsListadoSolicitados}
                  data={this.state.pedidosPausados}
                  title=""
                  localization={localization}
                  actions={[
                    {
                      icon: 'category',
                      tooltip: 'Solicitar',
                      onClick: (event, rowData) => this.solicitarPedido(rowData)
                    },
                    {
                      icon: 'close',
                      tooltip: 'Cancelar pedido',
                      onClick: (event, rowData) => this.cancelar(rowData)
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
                tabName: "Recepción Completa",
                tabIcon: Done,
                tabContent: (
                  <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListadoSolicitados}
                  data={this.state.pedidosFinalizados}
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
                  columns={ColumnsListadoSolicitados}
                  data={this.state.pedidosCancelados}
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
      <Switch  key={"pedidos-switch"}>

        <Route path={this.props.match.url + "/editarpedido/:idPedido"} exact render={() =>

          <EditPedido getPedidos={()=>this.getPedidos()}    />
        } />

          <Route path={this.props.match.url + "/nuevopedido/"} exact render={() =>

            <NewPedido  getPedidos={()=>this.getPedidos()}    />
        } />

      </Switch>,
      <ModalDelete
      key={"pedidos-modal"}
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,
      <ModalDisenoaSolicitar
      key={"pedidos-modalDisenoaSolicitar"}
        openSolicitarDialog={this.state.openSolicitarDialog}
        solicitarPedidoRowData={this.state.solicitarRowData}

        handleCloseSolicitarPedido={() => this.handleCloseSolicitarPedido()}
        handleSolicitarPedido={(rowData) => this.handleDisenoaSolicitado(rowData)}
      />,
      <ModalSolicitar
      key={"pedidos-modalSolicitar"}
        openPedidoDialog={this.state.openPedidoDialog}
        pedidoRowData={this.state.pedidoRowData}

        handleCloseSolicitarPedido={() => this.handleCloseSolicitarPedido()}
        handleSolicitarPedido={(rowData) => this.handleSolicitarPedido(rowData)}
      />,
      <ModalFinalizar
      key={"pedidos-modalFinalizar"}
        openFinalizarDialog={this.state.openFinalizarDialog}
        finalizarRowData={this.state.finalizarRowData}

        handleCloseFinalizar={() => this.handleCloseFinalizar()}
        handleFinalizar={(rowData) => this.handleFinalizar(rowData)}
      />,
      <ModalCancelar
      key={"pedidos-modalCancelar"}
        openCancelarDialog={this.state.openCancelarDialog}
        cancelarRowData={this.state.cancelarRowData}

        handleCloseCancelar={() => this.handleCloseCancelar()}
        handleCancelar={(rowData) => this.handleCancelar(rowData)}
      />,
      <ModalPausarPedido
      key={"pedidos-modalPausarPedido"}
        openPausarPedidoDialog={this.state.openPausarPedidoDialog}
        pausarPedidoRowData={this.state.pausarPedidoRowData}

        handleClosePausarPedido={() => this.handleClosePausarPedido()}
        handlePausarPedido={(rowData) => this.handlePausarPedido(rowData)}
      />

    ]);
  }
}


export default withStyles(styles)(PedidosEstados);
