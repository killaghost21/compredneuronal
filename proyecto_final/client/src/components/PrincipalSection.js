import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Selector from "./Selector";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage:
      "url(https://i.pinimg.com/originals/33/4b/62/334b62a232c6d0fe77dc9ea4a28ea7e2.jpg)",
    backgroundSize: "contain",
    padding: theme.spacing(8, 0, 6),
  },
  heroTitle: {
    backgroundColor: "#000000b8",
    borderRadius: "40px",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));
const PrincipalSection = ({ teams }) => {
  const classes = useStyles();

  const predecir = () => {
    Swal.fire({
      title: "Resultado!",
      icon: "success",
      html:
        "<h2>Posible ganador: lakers</h2>" +
        "<p>Probabilidades <b>Lakers: 90%</b></p>" +
        "<p>Probabilidades <b>Bulls: 10%</b></p>",
      confirmButtonText: "ok",
    });
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          className={classes.heroTitle}
          component="h2"
          variant="h3"
          align="center"
          color="secondary"
          gutterBottom
        >
          Seleccion Equipos
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <Grid item xs={6}>
              <Selector teams={teams} />
            </Grid>
            <Grid item xs={6}>
              <Selector teams={teams} />
            </Grid>
            <Grid container justify="center">
              <Button variant="contained" color="primary" onClick={predecir}>
                Predecir Ganador
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default PrincipalSection;
