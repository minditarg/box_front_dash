import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';

export const StateListado = {
    openMovimientos:false,
    insumoDetalle: [],

    insumos: [],
    editFormIsValid: false,
    isLoading:false,
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

  export const ColumnsDetalleListado = [
    { title: "Id", field: "id"}
    ];

  export const ColumnsListado = [
  { title: "Identificador", field: "identificador",sort:(a,b) => { if(a.identificador.localeCompare(b.identificador) == 0) { return a.numero - b.numero } else { return a.identificador.localeCompare(b.identificador) } } },
  { title: "Descripcion", field: "descripcion" },
  { title: "Unidad", field: "unidad" },
  { title: "Stock Minimo", field: "minimo" },
  { title: "Stock Actual", field: "cantidad"}
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
  