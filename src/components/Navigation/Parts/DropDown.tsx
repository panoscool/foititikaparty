import React, { Fragment, useState, useRef } from "react";
import {
  Grow,
  Paper,
  Popper,
  Button,
  MenuList,
  ClickAwayListener
} from "@material-ui/core";

const DropDown = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event: ) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <Fragment>
      <Button
        ref={anchorRef}
        aria-owns={open ? "menu-list" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        {button}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper id="menu-list">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onClick={handleClose}>{children}</MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

export default DropDown;
