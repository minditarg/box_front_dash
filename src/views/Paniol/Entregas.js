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
import NewEntrega from './NewEntrega';
import DetalleEntregas from './components/DetalleEntregas';


import { withStyles } from '@material-ui/styles';


const columns = [
    { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},

  { title: "Modulo", field: "mdescripcion" },
  { title: "Referencia", field: "referencia" },

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

class Entregas extends Component {
  state = {
    entregas: [],
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

  getEntregas = () => {
    this.setState({
      isLoading: true
    })
    Database.get('/list-entregas',this,null,true)
      .then(res => {


          let resultado = [...res.result];
          resultado = resultado.map(elem=>{
            return {
              ...elem,
              identificador: elem.descripcion_id + elem.id,
              fecha: moment(elem.fecha).format("DD/MM/YYYY")
            }
          })
          this.setState({
            entregas: resultado,
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
          <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaentrega')} color="primary"><AddIcon /> Nueva Entrega</Button>

            <MaterialTable
              isLoading={this.state.isLoading}
              columns={columns}
              data={this.state.entregas}
              title=""
              actions={this.state.actions}

              localization={localization}

              options={{
                exportButton: true,
                exportAllData:true,
                exportFileName:"Entregas " + moment().format("DD-MM-YYYY"),
                exportDelimiter:";",
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
