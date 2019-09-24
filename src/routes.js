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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
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
import Pedidos from "views/Pedidos/Pedidos";
import NewPedido from "views/Pedidos/NewPedido";
import Stock from "views/Stock/Stock";
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
    path: "/stock",
    name: "Stock",
    rtlName: "ST",
    icon: Person,
    component: Stock,
    layout: "/admin"
  },
  {
    groupComponent:true,
    name:'Insumos',
    open:'open1',
    dependences: [
      {
      path: "/insumos",
      name: "Listado",
      rtlName: "LI",
      icon: Person,
      component: Insumos,
      layout: "/admin"
    },
    {
      path: "/nuevoinsumo",
      name: "Nuevo",
      rtlName: "NI",
      icon: Person,
      component: NewInsumo,
      layout: "/admin"

    }

    ]

  },
  {
    groupComponent:true,
    name:'Ingresos',
    open:'openPedidos',
    dependences: [
      {
      path: "/pedidos",
      name: "Listado",
      rtlName: "NP",
      icon: Person,
      component: Pedidos,
      layout: "/admin"
    },
    {
      path: "/nuevopedido",
      name: "Nuevo",
      rtlName: "NI",
      icon: Person,
      component: NewPedido,
      layout: "/admin"

    }

    ]

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
