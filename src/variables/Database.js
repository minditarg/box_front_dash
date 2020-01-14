
import axios from "axios";



class Database {


  static get(url,_this) {
    return new Promise((resolve, reject) => {
          axios.get(url) .then(res => {
            if(res.data.success == 1)
            {
              resolve(res.data);
            }
            else if(res.data.success == 0)
            {
              reject({message:"Error en consulta SQL"});
            } else {

              reject({message:"Error desconocido"});
            }
          },err => {
            if(err.response){
              if(err.response.status == 401) {
                if(_this)
              _this.props.history.replace("/");
              reject({message:"No inició sesión en la aplicación"})
              }
              else if(err.response.status == 406) {

              reject({message:"No tiene permisos en esta sección"})
              }
              else {
              reject({message:"error desconocido"});
              }
            } else if(err.message) {
              reject({message:err.message});
            } else {
            reject({message:"Error de conexión al servidor"});
          }
          })


       })


  }

  static post(url,data,_this) {
    return new Promise((resolve, reject) => {
          axios.post(url,data) .then(res => {
            if(res.data.success == 1)
            {
              resolve(res.data);
            }
            else if(res.data.success == 0)
            {
              reject({message:"Error en consulta SQL"});
            } else {

              reject({message:"Error desconocido"});
            }
          },err => {
            if(err.response){
              if(err.response.status == 401) {
                if(_this)
              _this.props.history.replace("/");
              reject({message:"No inició sesión en la aplicación"})
              }
              else if(err.response.status == 406)
              {
              reject({message:"No tiene permisos en esta sección"})
              }
              else
              {
              reject({message:"error desconocido"});
              }
            } else if(err.message) {
              reject({message:err.message});
            } else {
            reject({message:"Error de conexión al servidor"});
          }
          })


       })


  }


}

export default Database;
