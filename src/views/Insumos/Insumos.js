import React, { Component } from "react";
import axios from "axios";
import { Route, Switch ,Link} from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from "./ModalDelete";
import EditInsumo from "./components/EditInsumo";

import { ColumnsListado, StateListado } from "./VariablesState";



class Insumos extends Component {
    state = { ... StateListado};


  deleteMaterial = (rowData) => {
        this.handleClickOpen(rowData);

    }

  getInsumos = () => {
        axios.get('/list-insumos')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                insumos: resultado
              })
            } else if(res.data.success == 3 || res.data.success == 4){
              toast.error(res.data.error_msj);
              setTimeout(()=>{
                this.props.history.replace('/');
              },3500)
            }

          },err =>{
            toast.error(err.message);
          })
      }

  handleClickOpen(rowData) {
    this.setState({
      openDeleteDialog:true,
      deleteRowData:rowData
    })
  }

  handleClose() {
    this.setState({
      openDeleteDialog:false,
      deleteRowData:null
    })
  }

  handleDelete(rowData) {
    if(rowData.id) {
    axios.post('/delete-insumos', {
            id:rowData.id
    })
      .then(res => {
        if (res.data.success == 1) {
          this.handleClose();
         this.getInsumos();
         toast.success("Insumo eliminado");
        }
      },err =>{
        toast.error(err.message);
      })
    }

  }

      componentDidMount() {

        this.getInsumos();

      }





  
      reloadInsumos = () => {
        this.getInsumos();
      }


    render() {

        return ([
          <Switch>
                <Route path={ this.props.match.url } exact  render={() =>
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={ColumnsListado}
                    data={this.state.insumos}
                    title="Insumos"
                    actions={[ {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarinsumo/' + rowData.id)
                      },
                      {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => this.deleteMaterial(rowData)
                      }]}
                />

            </div> } />

              <Route path={ this.props.match.url + "/editarinsumo/:idinsumo"} exact  render={() =>

            <EditInsumo
            />
          } />

            </Switch>,
          <ModalDelete
            openDeleteDialog={this.state.openDeleteDialog}
            deleteRowData={this.state.deleteRowData}

            handleClose={()=>this.handleClose()}
            handleDelete={(rowData)=>this.handleDelete(rowData)}
           />,
           <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={3000}/>

   ]);
    }
}


export default Insumos;
