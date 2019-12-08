export const StateListConfiguracion = {
    configuracion: [],
    offset:0,
    checked: [],
    menuContext: null,
    botonesAcciones: {
        nuevo: {

            enabled: true,
            texto: 'Nuevo'
        },
        editar: {

            enabled: false,
            texto: 'Editar'
        },
        delete: {

            enabled: false,
            texto: 'Eliminar'
        }
    },
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false




}

export const StateEditConfiguracion = {

    editConfiguracionForm: {
        alertaCosto: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Alerta Costo (dias)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    ConfiguracionEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false

}



export const StateNewConfiguracion = {

    newConfiguracionForm: {
        alertaCosto: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Alerta Costo (dias)',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Usuario", field: "configuracionname" },
{ title: "Tipo de Usuario", field: "desc" }
];
