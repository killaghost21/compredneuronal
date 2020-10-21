import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <SportsBasketballIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Apuestas NBA
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
