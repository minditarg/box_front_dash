
import axios from "axios";



class Database {


  static get(url,_this) {
    return new Promise((resolve, reject) => {
          axios.get(url) .then(res => {
            if(res.data.success == 1)
            {
              resolve(res.data);
            }
            else if(res.data.success == 3)
            {
            _this.props.history.push("/");
            reject("No está autenticado");
          }
            else if(res.data.success == 0)
            {
              reject("Error en consulta SQL");
            } else {

              reject("Error desconocido");
            }
          },err => {

            reject("Error de conexión al servidor");

          })


       })


  }
}

export default Database;
