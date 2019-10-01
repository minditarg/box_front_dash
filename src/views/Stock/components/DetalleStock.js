import React, { Component } from "react";
import axios from "axios";
import { withStyles } from '@material-ui/styles';
import moment from "moment";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {}

class DetalleStock extends Component {
    state = {
        detalle: []
    }
    componentDidMount() {
        axios.get('/detalle-stock/' + this.props.idInsumo + '/' + this.props.cantidadRegistros).then(res => {
            console.log(res);
            //console.log(moment(res.data.result[0].fecha).format('DD/MM/YYYY'));
            this.setState({
                detalle: res.data.result
            })
        })
    }
    render() {


        return (

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Movimiento</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell align="right">Identificador</TableCell>
                        <TableCell align="right">Usuario</TableCell>
                        
                        <TableCell align="right">Fecha</TableCell>
                    
                    </TableRow>
                </TableHead>
                <TableBody>
                  

                    {this.state.detalle.map(elem => {
                                return <TableRow key={elem.id}>
                                 <TableCell >
                                {elem.descripcion}
                            </TableCell>
                             <TableCell align="right">{elem.cantidad}</TableCell>
                             <TableCell align="right">{elem.identificador}</TableCell>
                             <TableCell align="right">{elem.username}</TableCell>
                            
                             <TableCell align="right">{moment(elem.fecha).format('DD/MM/YYYY')}</TableCell>
                                        </TableRow>
                       
                    })

                    }
                </TableBody>
            </Table>
        )

    }

}

export default withStyles(styles)(DetalleStock);



