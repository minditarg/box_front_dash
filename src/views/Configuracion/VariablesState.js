export const StateListado = {
  costos: [],
  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false
}

export const ColumnsListado = [
  { title: "Alerta Costo", field: "nombre" }
];

export const StateEditConfiguracion =
{
  editFormIsValid: false,
  costoEdit: null,
  editConfiguracionForm: {
    alertaCosto: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        label: 'Alerta Costo',
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

