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
import EditPlantilla from "./components/EditPlantilla";
import Button from "components/CustomButtons/Button.js";

import { ColumnsListado, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import NewPlantilla from './NewPlantilla';

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

class Plantillas extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getPlantillas = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-plantillas')
      .then(res => {

          let resultado = [...res.result];
          this.setState({
            insumos: resultado,
            isLoading:false
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
      Database.post('/delete-plantilla', {
        id: rowData.id
      })
        .then(res => {

            this.handleClose();
            this.getPlantillas();
            toast.success("Plantilla eliminada");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {

    this.getPlantillas();

  }


  reloadPlantillas = () => {
    this.getPlantillas();
  }


  render() {
   let style={  maxWidth: "100%"}
    if(this.props.match.url != this.props.location.pathname) {
      style={ display:'none', maxWidth: "100%"}
    }
    return ([
       <div key={"plantillas-list-plantillas"} style={style}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >PLANTILLAS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Plantillas
                      </p>
              </CardHeader>
              <CardBody>
               <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaplantilla')} color="primary"><AddIcon /> Nueva Plantilla</Button>
                <MaterialTable
                isLoading={this.state.isLoading}
                  columns={ColumnsListado}
                  data={this.state.insumos}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Plantilla',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarplantilla/' + rowData.id)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Borrar Plantilla',
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
      <Switch  key={"plantillas-switch"}>

        <Route path={this.props.match.url + "/editarplantilla/:idPlantilla"} exact render={() =>

          <EditPlantilla getPlantillas={()=>this.getPlantillas()} />
        } />

          <Route path={this.props.match.url + "/nuevaplantilla/"} exact render={() =>

          <EditPlantilla  getPlantillas={()=>this.getPlantillas()} />
        } />

      </Switch>,
      <ModalDelete
      key={"plantillas-modal"}
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,


    ]);
  }
}


export default withStyles(styles)(Plantillas);
