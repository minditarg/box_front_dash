import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import {toast } from 'react-toastify';
import { CardActions } from "@material-ui/core";
import Moment from 'react-moment';
import moment from 'moment';
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import Button from "components/CustomButtons/Button.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

//import DetalleIngresos from './components/DetalleIngresos'
import NewPedido from './NewPedido';
import DetallePedidos from './components/DetallePedidos';


import { withStyles } from '@material-ui/styles';


const columns = [
    { title: "Identificador", field: "identificador"},
  { title: "Usuario", field: "username" },
  { title: "Fecha", field: "fecha", customSort: (a, b) => moment(a.fecha,"DD/MM/YYYY").format("YYYYMMDD") - moment(b.fecha,"DD/MM/YYYY").format("YYYYMMDD")  },
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

class Pedidos extends Component {
  state = {
    pedidos: [],
    actions: [],
    isLoading: false
  };


  deleteMaterial = (id) => {
    //alert("You want to delete " + id);
    Database.post('/delete-pedidos', {
      id: id
    },this)
      .then(res => {
          this.getPedidos();
          toast.info("Ingreso eliminado");

      },err => {
        toast.error(err.message);
      })
  }

  getPedidos = () => {
    this.setState({
      isLoading: true
    })
    Database.get('/list-pedidos',this)
      .then(res => {

          let resultado = [...res.result];
          resultado = resultado.map(elem=>{
            return {
              ...elem,
              //identificador: elem.descripcion_id + elem.id,
              fecha: moment(elem.fecha).format("DD/MM/YYYY")
            }
          })
          this.setState({
            pedidos: resultado,
            isLoading: false
          })

      },err => {
        this.setState({
          isLoading: false
        })
        toast.error(err.message);
      })
  }

  componentDidMount() {
    this.getPedidos();

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
            <h4 className={this.props.classes.cardTitleWhite} >PEDIDOS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Pedidos
                      </p>
          </CardHeader>
          <CardBody>
          <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevapedido')} color="primary"><AddIcon /> Nuevo Pedido</Button>

            <MaterialTable
              isLoading={this.state.isLoading}
              columns={columns}
              data={this.state.pedidos}
              title=""
              actions={this.state.actions}

              localization={localization}

              options={{
                exportButton: true,
                exportAllData:true,
                exportFileName:"Pedidos " + moment().format("DD-MM-YYYY"),
                exportDelimiter:";",
                headerStyle: {
                  backgroundColor: lightGreen[700],
                  color: '#FFF'
                },
              }}
              detailPanel={rowData => {
                console.log(rowData);
                return (
                  <DetallePedidos idPedido={rowData.id} cantidadRegistros="7" />
                )
              } }

              />
          </CardBody>
        </Card>

        <Switch>

          <Route path={this.props.match.url + "/nuevapedido"} exact render={() =>
            <NewPedido
            getPedidos={()=>this.getPedidos()}
             />
          } />



        </Switch>



      </div>
    );
  }
}


export default withStyles(styles)(Pedidos);
