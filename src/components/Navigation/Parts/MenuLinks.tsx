import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Hidden,
  Button,
  MenuItem,
} from "@material-ui/core";
import DropDown from "./DropDown";

const subNav = [
  { to: "/contact", label: "Contact" },
  { to: "/market-guide", label: "Market Guide" },
  { to: "/users-faq", label: "Users F.A.Q." }
];

const MenuLinks: React.FC = () => {
  return (
    <Fragment>
      <Hidden smDown implementation="css">
        <Button color="inherit" component={Link} to="/bicycle/search">
          Search
        </Button>

        <DropDown button="Informations">
          {subNav.map(nav => (
            <MenuItem key={nav.to} component={Link} to={nav.to}>
              {nav.label}
            </MenuItem>
          ))}
        </DropDown>

      </Hidden>
      <span>Auth</span>
    </Fragment>
  );
};

export default MenuLinks;
