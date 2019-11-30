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
import NewInsumo from "views/Insumos/NewInsumo";
import Categorias from "views/Insumos/Categorias";
import NewCategoria from "views/Insumos/NewCategoria";
import Ingresos from "views/Ingresos/Ingresos";
import NewIngreso from "views/Ingresos/NewIngreso";
import Stock from "views/Stock/Stock";
import AjusteStock from "views/Stock/AjusteStock";
import Entregas from "views/Paniol/Entregas";
import Devoluciones from "views/Paniol/Devoluciones";
import Modulos from "views/Modulos/Modulos";
import NewModulo from "views/Modulos/NewModulo";
import NewPlantilla from "views/Plantillas/NewPlantilla";
import Plantillas from "views/Plantillas/Plantillas";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "DS",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
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
    path: "/usuarios",
    name: "Usuarios",
    rtlName: "Us",
    icon: Person,
    component: Users,
    layout: "/admin"
  },

  {
    groupComponent: true,
    name: 'Insumos',
    open: 'open2',
    icon: ViewComfyIcon,
    dependences: [

      {
        path: "/categorias",
        name: "Categorias",
        rtlName: "LCA",
        icon: ListIcon,
        component: Categorias,
        layout: "/admin"
      },
      {
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
    groupComponent: true,
    name: 'Stock',
    open: 'openStock',
    icon: FormatAlignJustifyIcon,
    dependences: [
      {
        path: "/stock",
        name: "Listado",
        rtlName: "LI",
        icon: ListIcon,
        component: Stock,
        layout: "/admin"
      },
      {
        path: "/AjusteStock",
        name: "Ajuste",
        rtlName: "NI",
        icon: AdjustIcon,
        component: AjusteStock,
        layout: "/admin"
      },
      {
      path: "/ingresos",
      name: "Ingresos",
      rtlName: "NP",
      icon: LocalShippingIcon,
      component: Ingresos,
      layout: "/admin"
    }]
  },
   {
     groupComponent: true,
     name: 'Modulos',
     open: 'open4',
     icon: PictureInPictureIcon,
     dependences: [
       {
         path: "/modulos",
         name: "Listado",
         rtlName: "LM",
         icon: ListIcon,
         component: Modulos,
         layout: "/admin"
       },
       {
         path: "/nuevomodulo",
         name: "Nuevo",
         rtlName: "NM",
         icon: AddBoxIcon,
         component: NewModulo,
         layout: "/admin"

       }]
   },

  {
    groupComponent: true,
    name: 'Pañol',
    open: 'open5',
    icon: CompareArrows,
    dependences: [
      {
        path: "/entregas",
        name: "Entregas",
        rtlName: "LM",
        icon: ArrowForward,
        component: Entregas,
        layout: "/admin"
      },
      {
        path: "/devoluciones",
        name: "Devoluciones",
        rtlName: "NM",
        icon: ArrowBack,
        component: Devoluciones,
        layout: "/admin"

      }]
  },
  {
    path: "/plantillas",
    name: "Plantillas",
    rtlName: "Pla",
    icon: AssignmentIcon,
    component: Plantillas,
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
