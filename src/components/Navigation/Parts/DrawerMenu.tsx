import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Home, Edit, Search, Info } from "@material-ui/icons";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const navigation = [
  { to: "/", label: "Home", icon: <Home /> },
  { to: "/bicycle/search", label: "Search", icon: <Search /> },
  { to: "/bicycle/create", label: "Create", icon: <Edit /> }
];

const subNav = [
  { to: "/contact", label: "Contact" },
  { to: "/market-guide", label: "Market Guide" },
  { to: "/users-faq", label: "Users F.A.Q." },
  { to: "/sign-up", label: "Signup" },
  { to: "/sign-in", label: "Signin" }
];

interface Props {
  handleDrawerToggle: () => void
}

const DrawerMenu: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list"
      className={classes.root}
    >
      {navigation.map(nav => (
        <ListItem
          button
          component={Link}
          to={nav.to}
          key={nav.to}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>{nav.icon}</ListItemIcon>
          <ListItemText primary={nav.label} />
        </ListItem>
      ))}

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary="Informations" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subNav.slice(0, 3).map(nav => (
            <ListItem
              button
              component={Link}
              to={nav.to}
              key={nav.to}
              onClick={handleDrawerToggle}
              className={classes.nested}
            >
              <ListItemText primary={nav.label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
export default DrawerMenu;
