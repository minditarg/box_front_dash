/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListIcon from '@material-ui/icons/List';
import AdjustIcon from '@material-ui/icons/Adjust';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import SettingsIcon from '@material-ui/icons/Settings';
//import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import AllInbox from "@material-ui/icons/AllInbox";
import CompareArrows from "@material-ui/icons/CompareArrows";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AssignmentIcon from '@material-ui/icons/Assignment';
import DvrIcon from '@material-ui/icons/Dvr';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';


// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import Users from "views/Users/Users.js";
import TiposUsuarios from "views/Users/TiposUsuarios.js";
import Insumos from "views/Insumos/Insumos";
import Pedidos from "views/Pedidos/Pedidos";
import PedidosEstados from "views/Pedidos/PedidosEstados";
import Costos from "views/Costos/Costos";
import AlertaCostos from "views/Alertas/AlertaCostos";
import AlertaPedidos from "views/Alertas/AlertaPedidos";
import NewInsumo from "views/Insumos/NewInsumo";
import Categorias from "views/Insumos/Categorias";
import NewCategoria from "views/Insumos/NewCategoria";
import MovimientosInsumos from "views/Insumos/MovimientosInsumos";
import Ingresos from "views/Ingresos/Ingresos";
import NewIngreso from "views/Ingresos/NewIngreso";
import Stock from "views/Stock/Stock";
import AjusteStock from "views/Stock/AjusteStock";
import Configuracion from "views/Configuracion/Configuracion";
import Entregas from "views/Paniol/Entregas";
import Devoluciones from "views/Paniol/Devoluciones";
import Modulos from "views/Modulos/Modulos";
import NewPlantilla from "views/Plantillas/NewPlantilla";
import Plantillas from "views/Plantillas/Plantillas";
import ModulosPaniol from "views/Paniol/ModulosPaniol";
import MovimientoStock from "views/Stock/MovimientoStock";
import MovimientosModulos from "views/Modulos/MovimientosModulos";
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

import ModulosAnalisis from "views/Modulos/ModulosAnalisis";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import ModulosEstados from "views/Modulos/ModulosEstados";

const dashboardRoutes = [
  // {
  //   accesos: [],
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "DS",
  //   icon: Dashboard,
  //   component: DashboardPage,
   //  layout: "/admin"
   //}, 
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "UP",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "TL",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "TI",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "IC",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "MP",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "NO",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "RTL",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },

  


  {
    show:false,
    accesos: [11,12,13,14,15,16,17,18,19],
    groupComponent: true,
    name: 'Usuarios',
    open: 'open20',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [11],
        path: "/usuarios",
        name: "Usuarios",
        rtlName: "Us",
        icon: Person,
        component: Users,
        layout: "/admin"
      },

      {
        show:false,
        accesos: [12],
        path: "/tiposusuarios",
        name: "Tipos Usuarios",
        rtlName: "Us",
        icon: Person,
        component: TiposUsuarios,
        layout: "/admin"
      },




    ]
  },



  {
    show:false,
    accesos: [21,22,23,24,25,26,27,28,29],
    groupComponent: true,
    name: 'Insumos',
    open: 'open2',
    icon: ViewComfyIcon,
    dependences: [

      {
        show:false,
        accesos: [21],
        path: "/categorias",
        name: "Categorias",
        rtlName: "LCA",
        icon: ScatterPlotIcon,
        component: Categorias,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [22],
        path: "/insumos",
        name: "Insumos",
        rtlName: "LI",
        icon: ListIcon,
        component: Insumos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [24],
        path: "/movimientosinsumos",
        name: "Auditoria",
        rtlName: "LI",
        icon: DvrIcon,
        component: MovimientosInsumos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [23],
        path: "/costos",
        name: "Costos",
        rtlName: "CO",
        icon: AttachMoneyIcon,
        component: Costos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [1,2,3,4,5,6,7,8,9],
        path: "/configuracion",
        name: "Alerta Costos",
        rtlName: "Co",
        icon: SettingsIcon,
        component: Configuracion,
        layout: "/admin"
      },
     ]
  },

  {
    show:false,
    accesos: [31,32,33,34,35,36,37],
    groupComponent: true,
    name: 'Alertas',
    open: 'open6',
    icon: AccessAlarmIcon,
    dependences: [

      {
        show:false,
        accesos: [31],
        path: "/alertaCosto",
        name: "Costos",
        rtlName: "ALC",
        icon: AttachMoneyIcon,
        component: AlertaCostos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [32],
        path: "/alertaPedidos",
        name: "Pedidos",
        rtlName: "ALP",
        icon: AssignmentIcon,
        component: AlertaPedidos,
        layout: "/admin"
      }
     ]
  },


  {
    show:false,
    accesos: [41,42,43,44,45,46],
    groupComponent: true,
    name: 'Stock',
    open: 'open10',
    icon: FormatAlignJustifyIcon,
    dependences: [
      {
        show:false,
        accesos: [41],
        path: "/stock",
        name: "Listado",
        rtlName: "LI",
        icon: ListIcon,
        component: Stock,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [42],
        path: "/AjusteStock",
        name: "Ajuste",
        rtlName: "NI",
        icon: AdjustIcon,
        component: AjusteStock,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [43],
      path: "/ingresos",
      name: "Ingresos",
      rtlName: "NP",
      icon: LocalShippingIcon,
      component: Ingresos,
      layout: "/admin"
    }
    ,
    {
      show:false,
      accesos: [44],
    path: "/movimientostock",
    name: "Auditoria",
    rtlName: "NP",
    icon: DvrIcon,
    component: MovimientoStock,
    layout: "/admin"
  }



  ]
  },
   {
     show:false,
     accesos: [51,52,53,54,55,56,57,58,59],
     groupComponent: true,
     name: 'Modulos',
     open: 'open4',
     icon: PictureInPictureIcon,
     dependences: [
       {
         show:false,
         accesos: [53],
         path: "/plantillas",
         name: "Plantillas",
         rtlName: "Pla",
         icon: AssignmentIcon,
         component: Plantillas,
         layout: "/admin"
       },
      {
        show:false,
        accesos: [54],
        path: "/modanalisis",
        name: "Analisis",
        rtlName: "AN",
        icon: BarChartIcon,
        component: ModulosAnalisis,
        layout: "/admin"
      },
       {
         show:false,
         accesos: [51],
         path: "/modulos",
         name: "Listado",
         rtlName: "LM",
         icon: ListIcon,
         component: Modulos,
         layout: "/admin"
       },
       {
         show:false,
         accesos: [52],
        path: "/modestados",
        name: "Estados",
        rtlName: "LME",
        icon: DeviceHubIcon,
        component: ModulosEstados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [55],
       path: "/modmovimientos",
       name: "Auditoria",
       rtlName: "LME",
       icon: DvrIcon,
       component: MovimientosModulos,
       layout: "/admin"
     }
       ]
   },

  {
    show:false,
    accesos: [61,62,63,64,65,66,67],
    groupComponent: true,
    name: 'Pañol',
    open: 'open5',
    icon: CompareArrows,
    dependences: [
       {
         show:false,
         accesos: [61],
        path: "/paniolmodulos",
        name: "Módulos",
        rtlName: "LM",
        icon: PictureInPictureIcon,
        component: ModulosPaniol,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [62],
        path: "/entregas",
        name: "Entregas",
        rtlName: "LM",
        icon: ArrowForward,
        component: Entregas,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [63],
        path: "/devoluciones",
        name: "Devoluciones",
        rtlName: "NM",
        icon: ArrowBack,
        component: Devoluciones,
        layout: "/admin"

      }]
  },

  {
    show:false,
    accesos: [71,72],
    groupComponent: true,
    name: 'Pedidos',
    open: 'open8',
    icon: AssignmentIcon,
    dependences: [

      {
        show:false,
        accesos: [71],
        path: "/pedidos",
        name: "Pedidos Internos",
        rtlName: "Ped",
        icon: AssignmentIcon,
        component: Pedidos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [72],
        path: "/pedestados",
        name: "Estados",
        rtlName: "PES",
        icon: DeviceHubIcon,
        component: PedidosEstados,
        layout: "/admin"
     }
     ]
   }//,

  // {
  //   show:false,
  //   accesos: [71],
  //   path: "/pedidos",
  //   name: "Pedidos",
  //   rtlName: "Ped",
  //   icon: AssignmentIcon,
  //   component: Pedidos,
  //   layout: "/admin"
  // }



];


export const breadcrumRoutes = [
  {
    path: "/admin/usuarios",
    name: "Usuarios",
    to: "/admin/usuarios",
    children: [
      {
        path: "/nuevousuario",
        name: "Nuevo",
        to: "/admin/usuarios/nuevousuario"
      },
      {
        path: "/editarusuario",
        name: "Editar",
        to: "/admin/usuarios/editarusuario"
      }
    ]
  }

]

export default dashboardRoutes
