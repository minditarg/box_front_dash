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
import Insumos from "views/Insumos/Insumos";
import Pedidos from "views/Pedidos/Pedidos";
import Costos from "views/Costos/Costos";
import AlertaCostos from "views/Alertas/AlertaCostos";
import NewInsumo from "views/Insumos/NewInsumo";
import Categorias from "views/Insumos/Categorias";
import NewCategoria from "views/Insumos/NewCategoria";
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
import ModulosAnalisis from "views/Modulos/ModulosAnalisis";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import ModulosEstados from "views/Modulos/ModulosEstados";

const dashboardRoutes = [
   {
     accesos: [],
     path: "/dashboard",
     name: "Dashboard",
     rtlName: "DS",
     icon: Dashboard,
     component: DashboardPage,
     layout: "/admin"
   },
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
    accesos: [],
    path: "/configuracion",
    name: "Configuracion",
    rtlName: "Co",
    icon: SettingsIcon,
    component: Configuracion,
    layout: "/admin"
  },

  {
    accesos: [],
    path: "/usuarios",
    name: "Usuarios",
    rtlName: "Us",
    icon: Person,
    component: Users,
    layout: "/admin"
  },

  {
    accesos: [],
    groupComponent: true,
    name: 'Insumos',
    open: 'open2',
    icon: ViewComfyIcon,
    dependences: [

      {
        accesos: [],
        path: "/categorias",
        name: "Categorias",
        rtlName: "LCA",
        icon: ListIcon,
        component: Categorias,
        layout: "/admin"
      },
      {
        accesos: [],
        path: "/insumos",
        name: "Insumos",
        rtlName: "LI",
        icon: ListIcon,
        component: Insumos,
        layout: "/admin"
      }
     ]
  },

  {
    accesos: [],
    groupComponent: true,
    name: 'Alertas',
    open: 'open6',
    icon: ViewComfyIcon,
    dependences: [

      {
        accesos: [],
        path: "/alertaCosto",
        name: "Costos",
        rtlName: "ALC",
        icon: ListIcon,
        component: AlertaCostos,
        layout: "/admin"
      }
     ]
  },


  {
    accesos: [],
    groupComponent: true,
    name: 'Stock',
    open: 'openStock',
    icon: FormatAlignJustifyIcon,
    dependences: [
      {
        accesos: [],
        path: "/stock",
        name: "Listado",
        rtlName: "LI",
        icon: ListIcon,
        component: Stock,
        layout: "/admin"
      },
      {
        accesos: [],
        path: "/AjusteStock",
        name: "Ajuste",
        rtlName: "NI",
        icon: AdjustIcon,
        component: AjusteStock,
        layout: "/admin"
      },
      {
        accesos: [],
      path: "/ingresos",
      name: "Ingresos",
      rtlName: "NP",
      icon: LocalShippingIcon,
      component: Ingresos,
      layout: "/admin"
    }]
  },
   {
     accesos: [],
     groupComponent: true,
     name: 'Modulos',
     open: 'open4',
     icon: PictureInPictureIcon,
     dependences: [
      {
        accesos: [],
        path: "/modulosanalisis",
        name: "Analisis",
        rtlName: "AN",
        icon: ListIcon,
        component: ModulosAnalisis,
        layout: "/admin"
      },
       {
         accesos: [],
         path: "/modulos",
         name: "Listado",
         rtlName: "LM",
         icon: ListIcon,
         component: Modulos,
         layout: "/admin"
       },
       {
         accesos: [],
        path: "/modulosestados",
        name: "Estados",
        rtlName: "LME",
        icon: ListIcon,
        component: ModulosEstados,
        layout: "/admin"
      }
       ]
   },

  {
    accesos: [],
    groupComponent: true,
    name: 'Pañol',
    open: 'open5',
    icon: CompareArrows,
    dependences: [
       {
         accesos: [],
        path: "/paniolmodulos",
        name: "Módulos",
        rtlName: "LM",
        icon: PictureInPictureIcon,
        component: ModulosPaniol,
        layout: "/admin"
      },
      {
        accesos: [],
        path: "/entregas",
        name: "Entregas",
        rtlName: "LM",
        icon: ArrowForward,
        component: Entregas,
        layout: "/admin"
      },
      {
        accesos: [],
        path: "/devoluciones",
        name: "Devoluciones",
        rtlName: "NM",
        icon: ArrowBack,
        component: Devoluciones,
        layout: "/admin"

      }]
  },
  {
    accesos: [],
    path: "/plantillas",
    name: "Plantillas",
    rtlName: "Pla",
    icon: AssignmentIcon,
    component: Plantillas,
    layout: "/admin"
  },
  {
    accesos: [],
    path: "/pedidos",
    name: "Pedidos",
    rtlName: "Ped",
    icon: AssignmentIcon,
    component: Pedidos,
    layout: "/admin"
  },
  {
    accesos: [],
    path: "/costos",
    name: "Costos",
    rtlName: "CO",
    icon: ListIcon,
    component: Costos,
    layout: "/admin"
  }




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
