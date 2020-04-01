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

class DetalleInsumos extends Component {
    state = {
        detalle: []
    }
    componentDidMount() {
       // alert('/detalle-pedidos/' + this.props.idInsumo);
        Database.get('/detalle-pedidos/' + this.props.idInsumo, this).then(res => {
            //console.log(moment(res.data.result[0].fecha).format('DD/MM/YYYY'));
            this.setState({
                detalle: res.result[0]
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
                        <TableCell>Tipo</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Cantidad Requerida</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {this.state.detalle.map((elem,key) => {
                        console.log('elem');
                        console.log(elem);
                        console.log('fin elem');
                        let color=null;
                       // alert(elem.tipo);
                        if(elem.tipo == 'pedido')
                            color={backgroundColor:green[100], borderBottomColor:green[400],borderBottomWidth:'1px'};
                        if(elem.tipo == 'modulo')
                            color={backgroundColor:blue[50], borderBottomColor:blue[800],borderBottomWidth:'1px'};
                            
                           // console.log(elem);

                        return <TableRow  key={"detalle-" + key}>
                                    <TableCell style={color}>{elem.tipo}</TableCell>
                                    <TableCell style={color} align="right">{elem.descripcion}</TableCell>
                                    <TableCell style={color} align="right">{elem.cantidad}</TableCell>
                                    <TableCell style={color} align="right">{elem.cantidad_requerida}</TableCell>                                   
                                </TableRow>

                    })

                    }
                </TableBody>
            </Table>
        )

    }

}

export default withStyles(styles)(DetalleInsumos);
