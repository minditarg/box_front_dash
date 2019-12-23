export const StateListado = {
  pedidos: [],
  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false


}
export const ColumnsListado = [
  { title: "Pedido", field: "id" },
  { title: "Identificador", field: "identificador" },
  { title: "Descripcion", field: "descripcion" },
  { title: "Cantidad", field: "cantidad" }
];

export const StateNewPedido =
{
  pedidos: [],
  newPedidoForm: {
    descripcion: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Descripcion',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    cantidad: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Cantidad',
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
  formIsValid: false
}

export const StateEditPedido =
{
  editFormIsValid: false,
  pedidoEdit: null,
  editPedidoForm: {
    categoria: {
      elementType: 'select',
      elementConfig: {
        label: 'Categoria de Pedido',
        options: [

        ],
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },

      valid: false,
      touched: false
    },
    codigo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Codigo Interno',
        fullWidth: true,
        disabled: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    numero: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Número',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
      descripcion: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Descripcion',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      cantidad: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Cantidad',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
  }

}