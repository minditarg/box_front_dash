import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import {  toast } from 'react-toastify';
import ModalDeleteCategoria from "./ModalDeleteCategoria";
import EditCategoria from "./components/EditCategoria";
import NewCategoria from './NewCategoria';

import { ColumnsListadoCategorias, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import Button from "components/CustomButtons/Button.js";

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

class Categorias extends Component {
  state = JSON.parse(JSON.stringify(StateListado));


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getCategorias = () => {
    this.setState({
      isLoading:true
    })
    axios.get('/list-categorias')
      .then(res => {
        this.setState({
          isLoading:false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            categorias: resultado
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
      axios.post('/delete-categorias', {
        id: rowData.id
      })
        .then(res => {
          if (res.data.success == 1) {
            this.handleClose();
            this.getCategorias();
            toast.success("Categoria eliminada");
          }
        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {

    this.getCategorias();

  }






  reloadCategorias = () => {
    this.getCategorias();
  }


  render() {

    return ([
      <Switch>
        <Route path={this.props.match.url} exact render={() =>
          <div style={{ maxWidth: "100%" }}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >CATEGORIAS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Categorias
                      </p>
              </CardHeader>
              <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaCategoria')} color="primary"><AddIcon /> Nueva Categoria</Button>

                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListadoCategorias}
                  data={this.state.categorias}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Categoria',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarcategoria/' + rowData.id)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Borrar Categoria',
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

          </div>} />

        <Route path={this.props.match.url + "/editarcategoria/:idcategoria"} exact render={() =>

          <EditCategoria
          />
        } />

        <Route path={this.props.match.url + "/nuevacategoria/"} exact render={() =>

        <NewCategoria
        
        />
        } />

      </Switch>,
      <ModalDeleteCategoria
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,


    ]);
  }
}


export default withStyles(styles)(Categorias);
