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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import AllInbox from "@material-ui/icons/AllInbox";
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
import Ingresos from "views/Ingresos/Ingresos";
import NewIngreso from "views/Ingresos/NewIngreso";
import Stock from "views/Stock/Stock";
import AjusteStock from "views/Stock/AjusteStock";
import Egresos from "views/Egresos/NewEgreso";
import Modulos from "views/Modulos/Modulos";
import NewModulo from "views/Modulos/NewModulo";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
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
    path: "/usuarios",
    name: "Usuarios",
    rtlName: "Us",
    icon: Person,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/egresos",
    name: "Pañol",
    rtlName: "Pa",
    icon: Person,
    component: Egresos,
    layout: "/admin"
  },
  {
    groupComponent:true,
    name:'Stock',
    open:'openStock',
    icon: Person,
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

    }]
  },
  {
    groupComponent:true,
    name:'Insumos',
    open:'open2',
    icon: Person,
    dependences: [
      {
      path: "/insumos",
      name: "Listado",
      rtlName: "LI",
      icon: ListIcon,
      component: Insumos,
      layout: "/admin"
    },
    {
      path: "/nuevoinsumo",
      name: "Nuevo",
      rtlName: "NI",
      icon: AddBoxIcon,
      component: NewInsumo,
      layout: "/admin"

    }]
  },
  {
    groupComponent:true,
    name:'Ingresos',
    icon: LocalShippingIcon,
    open:'open3',
    icon: Person,
    dependences: [
      {
      path: "/ingresos",
      name: "Listado",
      rtlName: "NP",
      icon: ListIcon,
      component: Ingresos,
      layout: "/admin"
    },
    {
      path: "/nuevoingreso",
      name: "Nuevo",
      rtlName: "NI",
      icon: AddBoxIcon,
      component: NewIngreso,
      layout: "/admin"

    }]
  },
  {
    groupComponent:true,
    name:'Modulos',
    open:'open4',
    icon: Person,
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
  }



];


export const breadcrumRoutes = [
{
  path:"/admin/usuarios",
  name:"Usuarios",
  to:"/admin/usuarios",
  children:[
    {
      path:"/nuevousuario",
      name:"Nuevo",
      to:"/admin/usuarios/nuevousuario"
    },
    {
      path:"/editarusuario",
      name:"Editar",
      to:"/admin/usuarios/editarusuario"
    }
  ]
}

]

export default dashboardRoutes
