import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => (
  <div>
    <MainNavigation />
    <main className={classes.main}>{props.children}</main>
  </div>
);

export default Layout;
