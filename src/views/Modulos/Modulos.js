import React, { Component } from "react";
import axios from "axios";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardActions } from "@material-ui/core";
import Moment from 'react-moment';
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

const columns = [
  { title: "Descripcion", field: "descripcion" },
  { title: "Estado", field: "descripcion_estado" },
  { title: "Codigo", field: "codigo" },
  { title: "Cliente", field: "cliente" },
  { title: "Chasis", field: "chasis" }
];

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
  state = {
    modulos: [],
    actions: [ {
              icon: 'edit',
              tooltip: 'Editar Modulo',
              onClick: (event, rowData) => alert("Editing " + rowData.descripcion)
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Modulo',
              onClick: (event, rowData) => this.deleteMaterial(rowData.id)
            }]
  };


  deleteMaterial = (id) => {
    //alert("You want to delete " + id);
    axios.post('/delete-modulos', {
      id: id
    })
      .then(res => {
        if (res.data.success == 1) {
          this.getModulos();
          toast.info("Modulo eliminado");
        }
      })
  }

  getModulos = () => {
    axios.get('/list-modulos')
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            modulos: resultado
          })
        }
      })
  }

  componentDidMount() {


    this.getModulos();


  }


  render() {
    return (
      <div style={{ maxWidth: "100%" }}>

        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >MODULOS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Modulos
                      </p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={columns}
              data={this.state.modulos}
              title=""
              actions={this.state.actions}
              localization={localization}

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
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={2000} />
      </div >
    );
  }
}


export default withStyles(styles)(Modulos);