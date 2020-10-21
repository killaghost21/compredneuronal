import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundImage:
      "url(https://i.pinimg.com/originals/90/88/a8/9088a8633531566646b9ba2b37ba6618.jpg)",
  },
}));

const SecundarySection = ({ teams }) => {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={4}>
        {teams.map((team) => (
          <Grid item key={team.id} xs={12} sm={6} md={4}>
            <Card team={team} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SecundarySection;
