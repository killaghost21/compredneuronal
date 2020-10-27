import React,{useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { globalContext } from "./Context";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const context = useContext(globalContext);

  const classes = useStyles();
  const handlerCLick = async () => {
    context.setState({ ...context.state, spinner: true });
    const res = await axios.get("http://localhost:5001/clean-db");
    context.setState({ ...context.state, spinner: false });
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <SportsBasketballIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Apuestas NBA
        </Typography>
        <Box component="span" m={2}>
          <Button variant="contained" color="secondary" onClick={handlerCLick}>
            clear DB
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
