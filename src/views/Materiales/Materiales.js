import React, { Component } from "react";
import axios from "axios";

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";



const columns = [{ title: "id", field: "id" },
{ title: "Codigo", field: "codigo" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Activo", field: "activo" }
];

class Materiales extends Component {
    state = {
         materiales: [],
         actions: []
    };


    deleteMaterial = (id) => {
        alert("You want to delete " + id);
        axios.post('/delete-materiales', {           
                id:id        
        })
          .then(res => {
            if (res.data.success == 1) {
             this.getMateriales();
            }
          })
    }

    getMateriales = () => {
        axios.get('/list-materiales')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                materiales: resultado
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
                  // TODO: REVISAR SI ESTO ESTA BIEN O COMO ES ASINCRONICO PUEDE NO CARGAR EL ACTIONS ANTES DE QUE MUESTRE LA TABLA CON EL getMateriales y al tocar el icono pinche
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
                this.getMateriales();
              }
            })
         
      }


    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={columns}
                    data={this.state.materiales}
                    title="Materiales"
                    actions={this.state.actions}
                />
            </div>
        );
    }
}


export default Materiales;