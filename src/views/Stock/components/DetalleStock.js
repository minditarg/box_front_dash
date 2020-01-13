import React, { Component } from "react";
import Database from "variables/Database.js";
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/styles';
import moment from "moment";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const styles = {}

class DetalleStock extends Component {
    state = {
        detalle: []
    }
    componentDidMount() {
        Database.get('/detalle-stock/' + this.props.idInsumo + '/' + this.props.cantidadRegistros,this).then(res => {
            //console.log(moment(res.data.result[0].fecha).format('DD/MM/YYYY'));
            this.setState({
                detalle: res.result
            })
        },err => {
          toast.error(err.message);
        })
    }
    render() {


        return (

            <Table style={{ backgroundColor:'#F9F9F9'}} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Movimiento</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell align="right">Identificador</TableCell>
                        <TableCell align="right">Usuario</TableCell>
                        <TableCell align="right">Minimo</TableCell>
                        <TableCell align="right">Parcial</TableCell>
                        <TableCell align="right">Fecha</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>


                    {this.state.detalle.map((elem,key) => {
                        let color=null;
                        let identificador = null;
                        if(elem.id_movimiento == 1)
                            color={backgroundColor:green[100], borderBottomColor:green[400],borderBottomWidth:'1px'};
                        if(elem.id_movimiento == 3)
                            color={backgroundColor:blue[50], borderBottomColor:blue[800],borderBottomWidth:'1px'};
                            if(elem.id_movimiento == 4)
                            color={backgroundColor:green[50], borderBottomColor:green[800],borderBottomWidth:'1px'};
                            if(elem.id_movimiento == 2)
                            color={backgroundColor:yellow[50], borderBottomColor:yellow[800],borderBottomWidth:'1px'};

                            console.log(elem);

                        if(elem.id_entrega) {
                          identificador = elem.descripcion_id + elem.id_entrega;
                        } else if(elem.id_ingreso) {
                          identificador = elem.descripcion_id + elem.id_ingreso;
                        } else if(elem.id_devolucion) {
                            identificador = elem.descripcion_id + elem.id_devolucion;
                        }

                        return <TableRow  key={"detalle-" + key}>
                            <TableCell style={color} >
                                {elem.descripcion}
                            </TableCell>
                            <TableCell style={color} align="right">{elem.cantidad}</TableCell>
                            <TableCell style={color} align="right">{identificador}</TableCell>
                            <TableCell style={color} align="right">{elem.username}</TableCell>
                            <TableCell style={color} align="right">{elem.minimo}</TableCell>
                            <TableCell style={color} align="right">{elem.parcial}</TableCell>

                            <TableCell style={color} align="right">{moment(elem.fecha).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>

                    })

                    }
                </TableBody>
            </Table>
        )

    }

}

export default withStyles(styles)(DetalleStock);
