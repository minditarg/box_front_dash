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
import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
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

class Modulos extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getModulos = () => {
    this.setState({
      isLoading:true
    })
    axios.get('/list-modulos')
      .then(res => {
        this.setState({
          isLoading:false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            insumos: resultado
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
                  Listado de Módulos
                      </p>
              </CardHeader>
              <CardBody>
               <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevomodulo')} color="primary"><AddIcon /> Nuevo Módulo</Button>
                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.insumos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Módulo',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarmodulo/' + rowData.id)
                  },
                  {
                    icon: 'delete',
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
              </CardBody>
            </Card>

          </div>,
      <Switch  key={"modulos-switch"}>
       
        <Route path={this.props.match.url + "/editarmodulo/:idModulo"} exact render={() =>

        { /* <EditPlantilla getPlantillas={()=>this.getPlantillas()} */ }  }  />
        } />

          <Route path={this.props.match.url + "/nuevaplantilla/"} exact render={() =>

          { /* <EditPlantilla  getPlantillas={()=>this.getPlantillas()} */ }  } />
        } />

      </Switch>,
      <ModalDelete
      key={"modulos-modal"}
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,


    ]);
  }
}


export default withStyles(styles)(Modulos);
