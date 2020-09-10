import React from "react"
import  classes  from "./Toolbar.css";
import Logo from "../../Logo/Logo"
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';
import NavigationItems from "../NavigationItems/NavigationItems"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
      <DrawToggle clicked={props.drawToggleClicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
  
  export default toolbar;