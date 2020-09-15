export const StateListado = {
  modulos: [],
  modulo:null,
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
  { title: "#Estimada", field: "cantidad_produccion" },
  { title: "#Asignada", field: "cantidad_asignada"},
  { title: "Unidad", field: "unidad"},
  { title: "Precio Unitario", field: "costo"},
  { title: "Costo Actual Diseño", field: "costo_actual_diseno"}
];

export const ColumnsListadoDiseno = [
  { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
  { title: "Num Presupuesto", field: "cotizacion", editable: 'never' },
  { title: "Descripcion", field: "descripcion" }
];

export const ColumnsListado = [
  { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
  { title: "Num Presupuesto", field: "cotizacion", editable: 'never' },
  { title: "Chasis", field: "chasis", editable: 'never' },
  { title: "Descripcion", field: "descripcion" }
];

export const ColumnsListadoCategorias = [
  { title: "Codigo", field: "codigo" },
  { title: "Descripcion", field: "descripcion" }
];



