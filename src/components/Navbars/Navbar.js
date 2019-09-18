import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, Switch ,Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  function mapBreadscrumRoutes(array) {
    return   array.find(elem =>{
         
            if(props.location.pathname.indexOf(elem.path) > -1)
              return true;
       return false;       
    })
  }

  let arrayBread = [ ]
  let arrayCopia = [ ...props.breadcrumRoutes ]
 
  function makeBrand(array) {
    let objArrayBread = mapBreadscrumRoutes(array);
    if(objArrayBread) {
      arrayBread.push({...objArrayBread});
      
    let lengtharray = arrayBread.length;

    if(lengtharray > 0 && arrayBread[lengtharray-1].children)
      makeBrand(arrayBread[lengtharray-1].children);
      }
 
}
makeBrand(arrayCopia);
  

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
         <Breadcrumbs aria-label="breadcrumb">
          {/* Here we create navbar brand, based on route name */}
           {arrayBread.map((elem,index) =>{
              return (
                 <Link key={"bread-" + index} color="inherit" to={ elem.to} >
                  {elem.name}
                  </Link>
              )

            })}

       </Breadcrumbs>
     
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
