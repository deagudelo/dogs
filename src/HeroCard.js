import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import {
  Person,
  Adjust,
  LocationOn,
  AllInclusive,
  GroupWork,
  PieChart,
} from "@material-ui/icons";

import { LazyLoadImage } from "react-lazy-load-image-component";

// import placeholder from "./dog-placeholder-tall.svg";

const useStyles = makeStyles((_) => ({
  root: {
    borderRadius: 16,
    // padding: 20,
    // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    // boxShadow: "0 0px 0px 0, 0 0px 0px 0",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    height: 600,
  },
  fill: {
    display: "flex",
    overflow: "hidden",
    height: 250
  },
  media: {
    flexShrink: 0,
    width: "100%",
    // maWidth: "100%",
    minHeight: "100%",
    // height: 250,
    // objectFit: "cover"
  },
}));

function HeroCard(props) {
  const classes = useStyles();
  // const {name, imageUrl, bredFor, temperament, lifeSpan, weight, origin, breedGroup}
  // console.log("breed", props);
  const { result } = props;
  const {
    name,
    image_url,
    bred_for,
    temperament,
    life_span,
    breed_weight,
    origin,
    breed_group,
  } = result.item;

  function renderEntry(values, idx) {
    const [icon, text, fallback] = values;
    return (
      <Grid item xs={12} container key={idx}>
        <Divider variant="fullWidth" />
        <Grid item xs={3} container justify="center" alignItems="center">
          {icon}
        </Grid>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        > */}

        <Grid item xs={9} container justify="flex-start">
          <Typography variant="body2" color="textSecondary" component="p">
            {text || fallback}
          </Typography>
        </Grid>
        {/* </div> */}
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={4}>
      <Card className={classes.root}>
        <Grid
          className={classes.fill}
          item
          xs={12}
          container
          justify="center"
          alignItems="center"
        >
          <LazyLoadImage
            className={classes.media}
            alt={`${name}-image`}
            src={image_url}
            // placeholderSrc={placeholder}
          />
        </Grid>
        {/* <CardMedia className={classes.media} image={image_url} title={name} /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {name}
          </Typography>

          <Grid
            item
            xs={12}
            container
            spacing={1}
            justify="center"
            alignItems="center"
          >
            {[
              [<Person color="disabled" />, temperament, "Unknown temperament"],
              [<Adjust color="disabled" />, bred_for, "Unknown breed purpose"],
              [<LocationOn color="disabled" />, origin, "Unknown origin"],
              [
                <GroupWork color="disabled" />,
                breed_group,
                "Unknown breed group",
              ],
              [
                <AllInclusive color="disabled" />,
                life_span,
                "Unknown life span",
              ],
              [
                <PieChart color="disabled" />,
                `${breed_weight} kg`,
                "Unknown weight",
              ],
            ].map(renderEntry)}
          </Grid>

          {/* <Typography variant="body2" color="textSecondary" component="p">
            {temperament}
          </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default React.memo(HeroCard);
