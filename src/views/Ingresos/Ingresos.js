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

import DetalleIngresos from './components/DetalleIngresos'


import { withStyles } from '@material-ui/styles';


const columns = [
  { title: "Identificador", field: "identificador" },
  { title: "Fecha Identificador", field: "fecha", render: rowData => <Moment format="DD/MM/YYYY">{rowData.fecha_identificador}</Moment> },
  { title: "Proveedor", field: "proveedor" },
  { title: "Usuario", field: "username" },
];

/*
render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}
 <Moment format="YYYY/MM/DD">
                1976-04-19T12:59-0500
            </Moment>
 */

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

class Ingresos extends Component {
  state = {
    ingresos: [],
    actions: []
  };


  deleteMaterial = (id) => {
    //alert("You want to delete " + id);
    axios.post('/delete-pedidos', {
      id: id
    })
      .then(res => {
        if (res.data.success == 1) {
          this.getPedidos();
          toast.info("Ingreso eliminado");
        }
      })
  }

  getPedidos = () => {
    axios.get('/list-ingresos')
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            ingresos: resultado
          })
        }
      })
  }

  componentDidMount() {

    axios.get('/me')
      .then(res => {
        if (res.data.success != 1)
          this.props.history.replace('/');
        else {
          // TODO: REVISAR SI ESTO ESTA BIEN O COMO ES ASINCRONICO PUEDE NO CARGAR EL ACTIONS ANTES DE QUE MUESTRE LA TABLA CON EL getPedidos y al tocar el icono pinche
          // this.state.actions=[
          //     {
          //       icon: 'delete',
          //       tooltip: 'Eliminar Ingreso',
          //       onClick: (event, rowData) => this.deleteMaterial(rowData.id)
          //     }
          //   ];
          this.getPedidos();
        }
      })

  }


  render() {
    return (
      <div style={{ maxWidth: "100%" }}>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >INGRESOS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Ingresos
                      </p>
          </CardHeader>
          <CardBody>

            <MaterialTable
              columns={columns}
              data={this.state.ingresos}
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
                detailPanel={rowData => {
                  console.log(rowData);
                    return (
                     <DetalleIngresos idIngreso={rowData.id} cantidadRegistros="7" />
                    )
                  } }
            />
          </CardBody>
        </Card>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={2000} />
      </div>
    );
  }
}


export default withStyles(styles)(Ingresos);
