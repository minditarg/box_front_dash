export const StateListado = {
  modulos: [],
  modulosdiseno: [],
  modulosFinalizados: [],
  modulosCancelados: [],
  modulosPausados: [],
  montodiseno: "X",
  montoproduccion: "X",

  openDeleteDialog: false,
  deleteRowData: null,
  isLoading: false,
  


}


export const ColumnsListadoAnalisisInsumos = [
  // { title: "id_insumo", field: "id_insumo"},
  { title: "Insumo", field: "insumo"},
  { title: "#Diseño", field: "cantidad_diseno"},
  { title: "#Produccion", field: "cantidad_produccion" },
  { title: "#Asignada", field: "cantidad_asignada"},
  { title: "Costo Actual", field: "costo"}
];

export const ColumnsListado = [
  { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
  { title: "Chasis", field: "chasis", editable: 'never' },
  { title: "Descripcion", field: "descripcion" }
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Descripcion", field: "descripcion" }
];
