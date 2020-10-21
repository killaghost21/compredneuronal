import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card as CardMaterial } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Card = ({ team }) => {
  const classes = useStyles();

  return (
    <CardMaterial className={classes.card}>
      {/* <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      /> */}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {team.id + ". " + team.full_name}
        </Typography>
        <Typography>Ciudad: {team.city}</Typography>
        <Typography>Conferencia: {team.conference}</Typography>
        <Typography>Divicion: {team.division}</Typography>
        <Typography>Nombre: {team.name}</Typography>
        <Typography>Abreviado: {team.abbreviation}</Typography>
      </CardContent>
    </CardMaterial>
  );
};

export default Card;
