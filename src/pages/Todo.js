import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import withAuth from "../components/withAuth";
import Copyright from "../components/common/Copyright";
import Nav from "../components/Layouts/Nav";
import TodoTable from "../components/Todo/TodoTable";
import { useStyles } from "../components/common/useStyles";
import AddTodo from "../components/Todo/AddTodo";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@material-ui/icons/ExitToApp";

function Todo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleAddTodo = (newTodo) => {
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate('/login', { replace: true });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Todo
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Nav openDrawer={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <TodoTable />
        </Container>
        <Container>
          <AddTodo onAddTodo={handleAddTodo} />
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
export default withAuth(Todo);