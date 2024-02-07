import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { useStyles } from "../common/useStyles";
import { useNavigate } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function Nav({ openDrawer, handleDrawerOpen, handleDrawerClose }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    const actions = {
      // Dashboard: () => {
      //   navigate('/')
      // },
      Todos: () => {
        navigate('/')
      },
      // Profile: () => {
      //   navigate('/profile')
      // },
      Logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate('/login')
      }
    };

    const action = actions[item.primary];
    if (action) {
      action();
    }
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose)
      }}
      open={openDrawer}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainListItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleItemClick(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.primary} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryListItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleItemClick(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.primary} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}