export const StateListado = {
  insumos: [],



  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false


}
export const ColumnsListado = [
  { title: "Codigo", field: "codigo", editable: 'never' },
  { title: "Referencia", field: "referencia" }
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Referencia", field: "referencia" }
];



export const StateNewCategoria =
{
  insumos: [],
  newCategoriaForm: {
    codigo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Codigo Interno',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    referencia: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Referencia',
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

export const StateNewPedido =
{
  insumos: [],
  newInsumoForm: {
    categoria: {
      elementType: 'select',
      elementConfig: {
        label: 'Categoria de Insumo',
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
        disabled: true,
        fullWidth: true

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
    referencia: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Referencia',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    unidad: {
      elementType: 'autosuggest',
      elementConfig: {
        type: 'text',
        label: 'Unidad',
        fullWidth: true,
        suggestions:[
          {label: 'kilogramos'},
          {label: 'gramos'},
          {label: 'miligramos'},
          {label: 'litros'},
          {label: 'mililitros'},
          {label: 'metros'},
          {label: 'milimetros'},
          {label: 'centimetros'},
          {label: 'unidades'},

        ]
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    minimo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Stock Minimo',
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
  insumoEdit: null,
  disableAllButtons: false,
  editPedidoForm: {
    categoria: {
      elementType: 'select',
      elementConfig: {
        label: 'Categoria de Insumo',
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
    referencia: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Referencia',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    unidad: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Unidad',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    minimo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Stock Minimo',
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

export const StateEditCategoria =
{
  editFormIsValid: false,
  insumoEdit: null,
  editCategoriaForm: {
    codigo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Codigo Interno',
        fullWidth: true
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    referencia: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Referencia',
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
