import React, { Component } from "react";
import axios from "axios";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const columns = [{ title: "id", field: "id" },
{ title: "Codigo", field: "codigo" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Activo", field: "activo" }
];

class Insumos extends Component {
    state = {
         insumos: [],
         actions: []
    };


    deleteMaterial = (id) => {

        axios.post('/delete-insumos', {
                id:id
        })
          .then(res => {
            if (res.data.success == 1) {
             this.getInsumos();
             toast.info("Insumo eliminado");
            }
          })
    }

    getInsumos = () => {
        axios.get('/list-insumos')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                insumos: resultado
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
                  // TODO: REVISAR SI ESTO ESTA BIEN O COMO ES ASINCRONICO PUEDE NO CARGAR EL ACTIONS ANTES DE QUE MUESTRE LA TABLA CON EL getInsumos y al tocar el icono pinche
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
                this.getInsumos();
              }
            })

      }


    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={columns}
                    data={this.state.insumos}
                    title="Insumos"
                    actions={this.state.actions}
                />
                 <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={2000}/>
            </div>
        );
    }
}


export default Insumos;
