import React, { Component } from "react";
import axios from "axios";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardActions } from "@material-ui/core";
import Moment from 'react-moment';


const columns = [{ title: "id", field: "id" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Estado", field: "descripcion_estado" },
{ title: "Codigo", field: "codigo" },
{ title: "Cliente", field: "cliente" },
{ title: "Chasis", field: "chasis" }
];

/*
render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}
 <Moment format="YYYY/MM/DD">
                1976-04-19T12:59-0500
            </Moment>
 */
class Modulos extends Component {
    state = {
         modulos: [],
         actions: []
    };


    deleteMaterial = (id) => {
        //alert("You want to delete " + id);
        axios.post('/delete-modulos', {           
                id:id        
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

          axios.get('/me')
            .then(res => {
              if (res.data.success != 1) 
                this.props.history.replace('/');
              else 
              {
                  // TODO: REVISAR SI ESTO ESTA BIEN O COMO ES ASINCRONICO PUEDE NO CARGAR EL ACTIONS ANTES DE QUE MUESTRE LA TABLA CON EL getModulos y al tocar el icono pinche
                this.state.actions=[
                    {
                      icon: 'edit',
                      tooltip: 'Editar Modulo',
                      onClick: (event, rowData) => alert("Editing " + rowData.descripcion)
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Eliminar Modulo',
                      onClick: (event, rowData) => this.deleteMaterial(rowData.id)
                    }
                  ];
                this.getModulos();
              }
            })
         
      }


    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={columns}
                    data={this.state.modulos}
                    title="Modulos"
                    actions={this.state.actions}
                />
                 <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>
            </div>
        );
    }
}


export default Modulos;