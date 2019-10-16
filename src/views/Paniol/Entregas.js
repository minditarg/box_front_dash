import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import {toast } from 'react-toastify';
import { CardActions } from "@material-ui/core";
import Moment from 'react-moment';
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import Button from "components/CustomButtons/Button.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

//import DetalleIngresos from './components/DetalleIngresos'
import NewEntrega from './NewEntrega';
import DetalleEntregas from './components/DetalleEntregas';


import { withStyles } from '@material-ui/styles';


const columns = [
  { title: "Descripcion", field: "descripcion" },

  { title: "Modulo desc", field: "mdescripcion" },
  { title: "Usuario", field: "username" },
  { title: "Fecha", field: "fecha", render: rowData => <Moment format="DD/MM/YYYY">{rowData.fecha}</Moment> },
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

class Entregas extends Component {
  state = {
    entregas: [],
    actions: [],
    isLoading: false
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

  getEntregas = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/list-entregas')
      .then(res => {
        this.setState({
          isLoading: false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            entregas: resultado
          })
        }
      })
  }

  componentDidMount() {
    this.getEntregas();

  }


  render() {
    let style = {}
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none' }
    }
    return (

      <div style={{ maxWidth: "100%" }}>
        <Card style={style}>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >ENTREGAS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Entregas
                      </p>
          </CardHeader>
          <CardBody>
          <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaentrega')} color="primary"><AddIcon /> Nuevo Entrega</Button>

            <MaterialTable
              isLoading={this.state.isLoading}
              columns={columns}
              data={this.state.entregas}
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
                  <DetalleEntregas idEntrega={rowData.id} cantidadRegistros="7" />
                )
              } }

              />
          </CardBody>
        </Card>

        <Switch>

          <Route path={this.props.match.url + "/nuevaentrega"} exact render={() =>
            <NewEntrega
            getEntregas={()=>this.getEntregas()}
             />
          } />



        </Switch>



      </div>
    );
  }
}


export default withStyles(styles)(Entregas);
