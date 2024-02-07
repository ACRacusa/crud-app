import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ListIcon from "@material-ui/icons/List";
export const mainListItems = [
  // {
  //   icon: <DashboardIcon />,
  //   primary: "Dashboard"
  // },
  {
    icon: <ListIcon />,
    primary: "Todos"
  },
  // {
  //   icon: <PeopleIcon />,
  //   primary: "Profile"
  // }
];

export const secondaryListItems = [
  {
    icon: <LogoutIcon />,
    primary: "Logout"
  }
];