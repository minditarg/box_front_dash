export const StateListado = {
  modulos: [],
  modulosdiseno: [],

  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false,
  


}
export const ColumnsListado = [
  { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
  { title: "Chasis", field: "chasis", editable: 'never' },
  { title: "Descripcion", field: "descripcion" }
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Descripcion", field: "descripcion" }
];
