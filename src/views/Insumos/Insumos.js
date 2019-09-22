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





      getInsumoEdit = (id) => {
        axios.get('/list-insumos/' + id)
              .then(resultado => {
                  if(resultado.data.success == 1) {
                      if(resultado.data.result.length > 0) {
                        this.setState({
                          insumoEdit:resultado.data.result[0]
                        })

                        let editInsumoFormAlt = {...this.state.editInsumoForm};
                          editInsumoFormAlt.codigo.value = resultado.data.result[0].codigo;
                          editInsumoFormAlt.descripcion.value = resultado.data.result[0].descripcion;

                          for(let key in editInsumoFormAlt){
                            editInsumoFormAlt[key].touched = true;
                            editInsumoFormAlt[key].valid = true;
                          }
                          this.setState({
                            editInsumoForm:editInsumoFormAlt
                          })
                      }
                        else
                    {
                      this.setState({
                        insumoEdit:null
                      })
                    }
                  }
              })
      }

      handleSubmitEditInsumo = (event) => {

          event.preventDefault();
          axios.post(`/update-insumos`, { id:this.state.insumoEdit.id,codigo: this.state.editInsumoForm.codigo.value, descripcion: this.state.editInsumoForm.descripcion.value})
              .then(res => {
                  let estadoAlt = null
                  if (res.data.success == 0) {
                      estadoAlt = false
                  }
                  if (res.data.success == 1) {
                      estadoAlt = true
                  }

                  if(estadoAlt){

                    this.setState({
                      editFormIsValid:false
                    })
                    toast.success("Los cambios se realizaron correctamente");
                    }
              })

      }

      checkValidity = (value, rules) => {
          let isValid = true;
          let textValid = null;

          if (rules.required && isValid) {
              isValid = value.toString().trim() !== '';
              textValid = 'El campo es requerido'
          }

          if (rules.minLength && isValid) {
              isValid = value.length >= rules.minLength;
              textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
          }

          if (rules.maxLength && isValid) {
              isValid = value.length <= rules.maxLength ;
              textValid = 'Supera el maximo de caracteres';
          }

          return {isValid:isValid,textValid:textValid};
      }




      inputEditChangedHandler = (event, inputIdentifier) => {
          let checkValid;
          const updatedOrderForm = {
              ...this.state.editInsumoForm
          };
          const updatedFormElement = {
              ...updatedOrderForm[inputIdentifier]
          };
          updatedFormElement.value = event.target.value;
          checkValid =  this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
          updatedFormElement.valid = checkValid.isValid;
          updatedFormElement.textValid = checkValid.textValid;
          updatedFormElement.touched = true;
          updatedOrderForm[inputIdentifier] = updatedFormElement;

          let formIsValidAlt = true;
          for (let inputIdentifier in updatedOrderForm) {
              formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
          }
          this.setState({
            editInsumoForm:updatedOrderForm,
            editFormIsValid:formIsValidAlt
          })

      }


      editSingleInsumo = value => {
      this.props.history.push(this.props.match.url + '/editarinsumo/' + value);
      }


      resetEditForm = ()=> {
      let editInsumoFormAlt = {...this.state.editInsumoForm};
        for(let key in editInsumoFormAlt){
          editInsumoFormAlt[key].value = ''
        }

        this.setState({
          editInsumoForm:editInsumoFormAlt,
          editFormIsValid:false
        })


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
             editInsumoForm={this.state.editInsumoForm}
             handleSubmitEditInsumo={(event)=>this.handleSubmitEditInsumo(event)}
             inputEditChangedHandler={(event,inputIdentifier)=>this.inputEditChangedHandler(event,inputIdentifier)}
             editFormIsValid={this.state.editFormIsValid}
             getInsumoEdit={(id)=>this.getInsumoEdit(id)}
             resetEditForm={()=>this.resetEditForm()}
             reloadInsumos={()=>this.reloadInsumos()}
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
