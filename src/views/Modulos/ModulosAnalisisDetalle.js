import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link, withRouter } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CategoryIcon from '@material-ui/icons/Category';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import { ColumnsListadoAnalisisInsumos, StateListado } from "./VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import Equalizer from '@material-ui/icons/Equalizer';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import NewEditModulo from './components/NewEditModulo';

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



class ModulosAnalisisDetalle extends Component {
  state = JSON.parse(JSON.stringify(StateListado));

  // constructor(props) {
  //   super(props);
  //   this.buscarRef = React.createRef();
  // }


  getMontos = () => {
    this.setState({
      isLoading:true
    })

    //,{id: rowData.id}this.props.match.params.idinsumo
    Database.get('/modulos-montos/'+ this.props.match.params.idModulo, this,null,true)
      .then(res => {
        this.setState({
          isLoading:false,
          montodiseno:res.modulos[0].montodiseno,
          montoproduccion:res.modulos[0].montoproduccion,
        })
          console.log(res);
      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }


  getAnalisisInsumos = () => {
    this.setState({
      isLoading:true
    })

    //,{id: rowData.id}this.props.match.params.idinsumo
    Database.get('/modulos-analizar-insumos/'+ this.props.match.params.idModulo, this)
      .then(res => {
        console.log(res);
        this.setState({
          isLoading:false,
          insumos:res.insumos,
          modulo:res.modulo[0]
        })
          console.log(res);
      }, err => {
        this.setState({
          isLoading:false
        })
        toast.error(err.message);
      })
  }

  componentDidMount() {

    this.getAnalisisInsumos();

    this.getMontos();

  }


  reloadModulos = () => {
    this.getAnalisisInsumos();
  }


  render() {
   let style={  maxWidth: "100%"}
    // if(this.props.match.url != this.props.location.pathname) {
    //   style={ display:'none', maxWidth: "100%"}
    // }
    return ([
       <div key={"modulos-list-plantillas"} style={style}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >MÓDULOS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Análisis de Módulos
                      </p>
              </CardHeader>
              <CardBody>
              <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"$ " + this.state.montodiseno} secondary="Diseño" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CategoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"$ " + this.state.montoproduccion} secondary="Producción" />
              </ListItem>
            </List>
                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListadoAnalisisInsumos}
                  data={this.state.insumos}
                  title=""
                  localization={localization}
                  options={{
                     exportButton: true,
                    exportAllData:true,
                    exportFileName:"Modulo " + (this.state.modulo ? this.state.modulo.descripcion : null )  +  moment().format("DD-MM-YYYY"),
                    exportDelimiter:";",
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

      </Switch>,


    ]);
  }
}


export default  withRouter(withStyles(styles)(ModulosAnalisisDetalle));
