export const StateListado = {
  insumos: [],



  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false


}
export const ColumnsListado = [
  { title: "Codigo", field: "codigo" },
  { title: "Número", field: "numero" },
  { title: "Descripcion", field: "descripcion" },
  { title: "Unidad", field: "unidad" },
  { title: "Stock Minimo", field: "minimo" }
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Descripcion", field: "descripcion" }
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
    }
  },
  formIsValid: false
}

export const StateNewInsumo =
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
    autorizar: {
      elementType: 'checkbox',
      elementConfig: {
        label: 'Autorizar al exceder límite de diseño',
        color: 'primary'
      },
      value: 0,
      validation: {
        required: false
      },
      valid: true,
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
    },
    alertar: {
      elementType: 'checkbox',
      elementConfig: {
        label: 'Alertar actualización de costo',
        color: 'primary'
      },
      value: 0,
      validation: {
        required: false
      },
      valid: true,
      touched: false
    }

  },
  formIsValid: false
}

export const StateEditInsumo =
{
  editFormIsValid: false,
  insumoEdit: null,
  editInsumoForm: {
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
    autorizar: {
      elementType: 'checkbox',
      elementConfig: {
        label: 'Autorizar al exceder límite de diseño',
        color: 'primary'
      },
      value: 0,
      validation: {
        required: false
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
    },
    alertar: {
      elementType: 'checkbox',
      elementConfig: {
        label: 'Alertar actualización de costo',
        color: 'primary'
      },
      value: 0,
      validation: {
        required: false
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
    }
  }
}
