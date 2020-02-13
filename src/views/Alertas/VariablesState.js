
import moment from 'moment';
export const StateListado = {
  costos: [],



  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false


}
export const ColumnsListado = [
  { title: "Identificador", field: "identificador", editable: 'never',sort:(a,b) => { if(a.identificador.localeCompare(b.identificador) == 0) { return a.numero - b.numero } else { return a.identificador.localeCompare(b.identificador) } } },
  { title: "Descripcion", field: "descripcion" },
  { title: "Unidad", field: "unidad" },
  { title: "Minimo", field: "minimo"},
  { title: "Cantidad", field: "cantidad" },
  { title: "Requerido", field: "requerido"},
  { title: "Pedido", field: "pedido"}
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Descripcion", field: "descripcion" }
];



export const StateNewCategoria =
{
  costos: [],
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
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  },
  formIsValid: false
}

export const StateNewCosto =
{
  costos: [],
  newCostoForm: {
    categoria: {
      elementType: 'select',
      elementConfig: {
        label: 'Categoria de Costo',
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
        type: 'number',
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

export const StateEditCosto =
{
  editFormIsValid: false,
  costoEdit: null,
  editCostoForm: {
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
    descripcion: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Descripcion',
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
    unidad: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Unidad',
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
    costo: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Costo actual',
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
  costoEdit: null,
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
