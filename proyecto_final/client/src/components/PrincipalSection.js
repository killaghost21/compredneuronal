import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Selector from "./Selector";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { globalContext } from "./Context";

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
  heroButton: {
    backgroundColor: "#607d8b",
    borderRadius: "10px",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const PrincipalSection = ({ teams }) => {
  const context = useContext(globalContext);

  const classes = useStyles();

  const predecir = () => {
    context.setState({ ...context.state, spinner: true });
    axios
      .post(
        "http://localhost:5001/games",
        {
          team1: context.state.selector.selector_1,
          team2: context.state.selector.selector_2,
        },
        { timeout: "20000" }
      )
      .then(function (response) {
        context.setState({ ...context.state, spinner: false });
        const highlightedCode = hljs.highlightAuto(
          JSON.stringify(
            {
              competingTeams: response.data.competingTeams,
              winners: response.data.winners,
              finalWinner: response.data.finalWinner,
              mlInfo: response.data.mlInfo,
              gamesByTeams: response.data.gamesByTeams,
            },
            null,
            2
          )
        ).value;

        Swal.fire({
          title: "Resultado!",
          icon: "success",
          html:
            `<h2>Posible ganador: <span>${response.data.finalWinner}</span></h2>` +
            `<p>Equipo 1: <b>${context.state.selector.selector_1}<span></span></b></p>` +
            `<p>Equipo 2: <b>${context.state.selector.selector_2}<span></span></b></p>` +
            `<div class="code"><pre><code class="html">${highlightedCode}</code></pre></div>`,
          confirmButtonText: "ok",
        });
        console.log(response.data);
      })
      .catch(function (error) {
        context.setState({ ...context.state, spinner: false });
        Swal.fire({
          title: "Error!",
          icon: "error",
          html: `<p><b>detail: <span>${error.message}</span></b></p>`,
          confirmButtonText: "ok",
        });
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
              <Selector teams={teams} id="selector_1" />
            </Grid>
            <Grid item xs={6}>
              <Selector teams={teams} id="selector_2" />
            </Grid>
            <Grid container justify="center">
              <div className={classes.heroButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={predecir}
                  disabled={
                    context.state.selector.selector_1 &&
                    context.state.selector.selector_2 &&
                    context.state.selector.selector_1 !==
                      context.state.selector.selector_2
                      ? false
                      : true
                  }
                >
                  Predecir Ganador
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default PrincipalSection;
