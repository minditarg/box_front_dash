import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Database from "variables/Database.js";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import routesTotal from "routes.js";
import { breadcrumRoutes } from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/boxside.jpg";
import boxlogoside from "assets/img/boxlogoside.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let ps;



const useStyles = makeStyles(styles);

toast.configure({
   position: toast.POSITION.BOTTOM_RIGHT,
   autoClose: 2000,
});




export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [routes, setRoutes] = React.useState([]);
  const [image, setImage] = React.useState(bgImage);
  const [user, setUser] = React.useState(null);
  const [color, setColor] = React.useState("green");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function mapBreadscrumRoutes(array) {
    return array.find(elem => {

      if (rest.location.pathname.indexOf(elem.path) > -1)
        return true;
      return false;
    })
  }

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin" && !prop.groupComponent) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              />
          );
        } else if (prop.groupComponent) {
          return prop.dependences.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
                />
            )
          })

        }
        return null;
      })}
      { /* <Redirect from="/admin" to="/admin/stock" /> */ }
      <Route
        path="/admin"
        exact
        render={() => {

          return (<div><h2>Bienvenid@ a Box Rental APP</h2><h4>Seleccione un Item del menú lateral para continuar</h4></div>)

        }}

        />
    </Switch>
  );

  let arrayBread = []
  let arrayCopia = [...breadcrumRoutes]

  function makeBrand(array) {
    let objArrayBread = mapBreadscrumRoutes(array);
    if (objArrayBread) {
      arrayBread.push({ ...objArrayBread });

      let lengtharray = arrayBread.length;

      if (lengtharray > 0 && arrayBread[lengtharray - 1].children)
        makeBrand(arrayBread[lengtharray - 1].children);
    }

  }
  makeBrand(arrayCopia);

  const handleCloseSession = ()=> {
    Database.get('/logout').then(res =>{
            setUser(null);
            rest.history.replace('/');

    }, err => {
      toast.error(err.message);
    })
  }

  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  React.useEffect(() => {

         Database.get('/me')
            .then(res => {
              let accesosUser = res.result[1].map( elem => {
                return parseInt(elem.id_acceso);
              });
              let routesFilter = routesTotal.filter(elem=> {
                let indexAccesos = elem.accesos.findIndex(elem2 => {
                  return (accesosUser.indexOf(elem2) > -1);
                })

                if(indexAccesos > -1 || elem.accesos.length == 0) {
                  if(elem.groupComponent) {
                  let dependences = elem.dependences.filter(elem3 => {
                    let indexAccesosDependences = elem3.accesos.findIndex(elem4 => {
                      return (accesosUser.indexOf(elem4) > -1);
                    })
                    if(indexAccesosDependences > -1 || elem3.accesos.length == 0) {
                      return true
                    }
                    return false
                  })

                  elem.dependences = dependences;
                  return true

                  } else {
                    return true;
                  }

                }
                return false;
              })



                  setUser(res.result[0][0]);

                  setRoutes(routesFilter);


            }, err => {
              rest.history.replace("/");
              toast.error(err.message);
            })


  }, []);







  return (

    <div className={classes.wrapper}>
      <Sidebar
        handleCloseSession={()=>handleCloseSession()}
        user={user}
        routes={routes}
        logoText={"box app"}
        logo={boxlogoside}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
        />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          handleCloseSession={()=>handleCloseSession()}
          user={user}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
          />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>

                <Breadcrumbs style={{ marginLeft:'1.5em',marginBottom:'1.5em'}} aria-label="breadcrumb">

                  {arrayBread.map((elem, index) => {

                    return (
                      <Link key={"bread-" + index} color="primary" to={elem.to} >
                        {elem.name}
                      </Link>
                    )

                  })}

                </Breadcrumbs>

            <div className={classes.container}>{switchRoutes}</div>

          </div>
        ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
        {/*getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
        fixedClasses={fixedClasses*/}

      </div>
    </div>
  );
}
