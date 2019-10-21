import React, { Component } from "react";
import axios from "axios";
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

import DetalleIngresos from './components/DetalleIngresos'
import NewIngreso from './NewIngreso'


import { withStyles } from '@material-ui/styles';


const columns = [
  { title: "Identificador", field: "identificador" ,customSort: (a, b) => a.id - b.id},
  { title: "Referencia", field: "referencia" },
  { title: "Fecha Referencia", field: "fecha_referencia",customSort: (a, b) => moment(a.fecha_referencia,"DD/MM/YYYY").format("YYYYMMDD") - moment(b.fecha_referencia,"DD/MM/YYYY").format("YYYYMMDD") },
  { title: "Proveedor", field: "proveedor" },
  { title: "Usuario", field: "username" },
  { title: "Fecha", field: "fecha",customSort: (a, b) => moment(a.fecha,"DD/MM/YYYY").format("YYYYMMDD") - moment(b.fecha,"DD/MM/YYYY").format("YYYYMMDD")  },
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

  getIngresos = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/list-ingresos')
      .then(res => {
        this.setState({
          isLoading: false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          resultado = resultado.map(elem =>{
            return { ...elem,
              identificador: elem.descripcion_id + elem.id,
              fecha: moment(elem.fecha).format("DD/MM/YYYY"),
              fecha_referencia:moment(elem.fecha_referencia).format("DD/MM/YYYY")
            }
          })




          this.setState({
            ingresos: resultado
          })
        }
      })
  }

  componentDidMount() {
    this.getIngresos();

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
            <h4 className={this.props.classes.cardTitleWhite} >INGRESOS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Ingresos
                      </p>
          </CardHeader>
          <CardBody>
          <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevoingreso')} color="primary"><AddIcon /> Nuevo Ingreso</Button>

            <MaterialTable
              isLoading={this.state.isLoading}
              columns={columns}
              data={this.state.ingresos}
              title=""
              actions={this.state.actions}

              localization={localization}

              options={{
                exportButton: true,
                exportAllData:true,
                exportFileName:"Ingresos " + moment().format("DD-MM-YYYY"),
                exportDelimiter:";",
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

        <Switch>

          <Route path={this.props.match.url + "/nuevoingreso"} exact render={() =>
            <NewIngreso
            getIngresos={()=>this.getIngresos()}
             />
          } />



        </Switch>



      </div>
    );
  }
}


export default withStyles(styles)(Ingresos);
