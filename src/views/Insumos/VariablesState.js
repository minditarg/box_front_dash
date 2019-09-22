export const StateListado = {
  insumos: [],
  editFormIsValid: false,
  insumoEdit:null,
  editInsumoForm: {
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
  },


  openDeleteDialog:false,
      deleteRowData:null


}
export const ColumnsListado = [{ title: "id", field: "id" },
{ title: "Codigo", field: "codigo" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Unidad", field: "unidad" },
{ title: "Stock Minimo", field: "minimo" }
];

export const StateNewInsumo =
{
  insumos: [],
  newInsumoForm: {
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
  },
  formIsValid: false
}
