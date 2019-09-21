import React, { Component } from "react";
import axios from "axios";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardActions } from "@material-ui/core";



const columns = [{ title: "id", field: "id" },
{ title: "Usuario", field: "username" },
{ title: "Identificador", field: "identificador" },
{ title: "Proveedor", field: "proveedor" },
{ title: "Fecha", field: "fecha" }
];

class Pedidos extends Component {
    state = {
         pedidos: [],
         actions: []
    };


    deleteMaterial = (id) => {
        alert("You want to delete " + id);
        axios.post('/delete-pedidos', {           
                id:id        
        })
          .then(res => {
            if (res.data.success == 1) {
             this.getPedidos();
             toast.info("Pedido eliminado");
            }
          })
    }

    getPedidos = () => {
        axios.get('/list-pedidos')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                pedidos: resultado
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
                  // TODO: REVISAR SI ESTO ESTA BIEN O COMO ES ASINCRONICO PUEDE NO CARGAR EL ACTIONS ANTES DE QUE MUESTRE LA TABLA CON EL getPedidos y al tocar el icono pinche
                this.state.actions=[
                    {
                      icon: 'edit',
                      tooltip: 'Edit User',
                      onClick: (event, rowData) => alert("Editing " + rowData.descripcion)
                    },
                    {
                      icon: 'delete',
                      tooltip: 'Delete User',
                      onClick: (event, rowData) => this.deleteMaterial(rowData.id)
                    }
                  ];
                this.getPedidos();
              }
            })
         
      }


    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={columns}
                    data={this.state.pedidos}
                    title="Pedidos"
                    actions={this.state.actions}
                />
                 <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>
            </div>
        );
    }
}


export default Pedidos;