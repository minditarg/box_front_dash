//MODULOS GENERALES
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

//ESTILOS Y COLORES
import { withStyles } from '@material-ui/styles';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

//CONTENEDORES
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';





const styles = {}

class DetalleIngresos extends Component {
    state = {
        detalle: []
    }
    
    
    componentDidMount() {
        axios.get('/list-ingresos-detalles/' + this.props.idIngreso + '/' + this.props.cantidadRegistros).then(res => {
            console.log(res);
            //console.log(moment(res.data.result[0].fecha).format('DD/MM/YYYY'));
            this.setState({
                detalle: res.data.result
            })
        })
    }
    
    render() {


        return (

            <Table style={{ backgroundColor:blueGrey[50]}} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Identificador</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell >Cantidad</TableCell>
                    
                    </TableRow>
                </TableHead>
                <TableBody>


                    {this.state.detalle.map(elem => {
                      
                            
                        return <TableRow key={elem.id}>
                            <TableCell >
                                {elem.codigo + elem.numero}
                            </TableCell>
                            <TableCell >{elem.descripcion}</TableCell>
                            <TableCell >{elem.cantidad + ' ' + elem.unidad}</TableCell>
                            

                        </TableRow>

                    })

                    }
                </TableBody>
            </Table>
        )

    }

}

export default withStyles(styles)(DetalleIngresos);



