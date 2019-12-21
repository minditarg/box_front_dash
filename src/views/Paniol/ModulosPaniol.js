import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable,  {  MTableBodyRow }  from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { toast } from 'react-toastify';
import Button from "components/CustomButtons/Button.js";

import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import NewEntrega from './NewEntrega';


import { withStyles } from '@material-ui/styles';

const styles = {
  rowTable: {
    
      backgroundColor: lightGreen[50]
    
  },
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
  },
  closeButton: {
    position: 'absolute',
    right: '0.5em',
    top: '0.5em',
    color: 'grey',
  }
};


const ColumnsListado = [
  { title: "Identificador", field: "identificador", customSort: (a, b) => a.id - b.id },
  { title: "Descripcion", field: "descripcion" }

];


const ColumnsListadoDetalle = [
  { title: "Identificador", field: "identificador", customSort: (a, b) => a.id - b.id },
  { title: "Descripcion", field: "descripcion" },
  { title: "Requerido", field: "cantidad_requerida", editable: 'never' },
  { title: "Asignada", field: "cantidad_asignada", editable: 'never' },
  { title: "Stock", field: "cantidad_stock", editable: 'never' },
  { title: "Disponible", field: "disponible", editable: 'never' },
];

class ModulosPaniol extends Component {
  state = {
    modulos: [],
    tituloDetalle: null,
    modulosDetalle: [],
    open: false,

    openDeleteDialog: false,
    deleteRowData: null,
    isLoading: false,
    isLoadingDetalle: false

  }


  deleteMaterial = (rowData) => {
    this.handleClickOpen(rowData);

  }

  getModulos = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/list-modulos')
      .then(res => {
        this.setState({
          isLoading: false
        })
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              identificador: 'MO' + elem.id
            }
          })
          this.setState({
            modulos: resultado
          })
        } else if (res.data.success == 3 || res.data.success == 4) {

        }

      }, err => {
        toast.error(err.message);
      })
  }

  handleClickOpen(rowData) {

    this.setState({ isLoadingDetalle: true, modulosDetalle: [], tituloDetalle: rowData.chasis, open: true });
    axios.get('/list-modulos-insumos/' + rowData.id)
      .then(res => {

        if (res.data.success == 1) {
          let disponible;
          console.log(res.data);
          res.data.insumos = res.data.insumos.map(elem => {
            if (elem.cantidad_requerida - elem.cantidad_asignada <= elem.cantidad_stock)
              disponible = elem.cantidad_requerida - elem.cantidad_asignada
            else
              disponible = elem.cantidad_stock;
            return {
              ...elem,
              identificador: elem.codigo + elem.numero,
              disponible: disponible
            }
          })
          this.setState({
            isLoadingDetalle: false,
            modulosDetalle: res.data.insumos
          })

        } else {
          toast.error("error en consulta SQL")
        }

      }, err => {
        toast.error("error de Red");

      })
  }

  handleClose() {
    this.setState({
      openDeleteDialog: false,
    })
  }

  closeDialog() {
    this.setState({
      open: false,
    })

  }

  componentDidMount() {
    this.getModulos();

  }


  reloadModulos = () => {
    this.getModulos();
  }


  render() {
    let style = { maxWidth: "100%" }
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none', maxWidth: "100%" }
    }
    return ([
      <div key={"modulos-list"} style={style}>
        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >MÓDULOS</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Listado de Módulos
                      </p>
          </CardHeader>
          <CardBody>
            <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaentrega')} color="primary"><AddIcon /> Nueva Entrega</Button>
            <MaterialTable
              isLoading={this.state.isLoading}
              columns={ColumnsListado}
              data={this.state.modulos}
              title=""
              localization={localization}
              actions={[{
                icon: 'description',
                tooltip: 'Detalle del Módulo',
                onClick: (event, rowData) => this.handleClickOpen(rowData)
              },
              {
                icon: 'arrow_forward',
                tooltip: 'Entregar a Módulo',
                onClick: (event, rowData) =>  this.props.history.push(this.props.match.url + '/nuevaentrega/' + rowData.id)
              }
              ]}
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

          <Dialog
        open={this.state.open}
        onClose={this.closeDialog.bind(this)}
        fullWidth={true}
        maxWidth={"xl"}
        >
        <DialogTitle>Detalle de Módulo ' {this.state.tituloDetalle} '
                            <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>


        <DialogContent>
         <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevaentrega')} color="primary"><AddIcon /> Nueva Entrega</Button>
          <MaterialTable
            isLoading={this.state.isLoadingDetalle}
            columns={ColumnsListadoDetalle}
            data={this.state.modulosDetalle}
            title=""
            localization={localization}
             components={{
                   
                    Row: props => {
                      
                      let clase=null;

                      if(props.data.disponible > 0)
                        clase = this.props.classes.rowTable;
                      
                      return (
                       
                        <MTableBodyRow  className={clase} {...props}   />  
                       
                      )

                    }
                   
                  }}
            options={{
              exportButton: true,
              headerStyle: {
                backgroundColor: lightGreen[700],
                color: '#FFF'
              },
            }}
            />
        </DialogContent>
      </Dialog>



      </div>,

        <Switch>

          <Route path={this.props.match.url + "/nuevaentrega/:idModulo"} exact render={() =>
            <NewEntrega 

             />
          } />



        </Switch>

    
    ]);
  }
}


export default withStyles(styles)(ModulosPaniol);
