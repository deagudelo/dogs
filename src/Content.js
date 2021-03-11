import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import Fuse from "fuse.js";
import loader from "./paw-loading.gif";
import paw from "./paw.svg";

// Fuzzy search options
const options = {
  isCaseSensitive: true,
  findAllMatches: true,
  ignoreLocation: true,
  threshold: 0.4,
  keys: [
    "name",
    "image_url",
    "bred_for",
    "temperament",
    "life_span",
    "breed_weight",
    "origin",
    "breed_group",
  ],
};

// Util to get a cleaner search dataset and therefore a faster search
const cleanResults = (big) => {
  const {
    name,
    image,
    bred_for,
    temperament,
    life_span,
    weight,
    origin,
    breed_group,
  } = big;
  const { url: image_url } = image;
  const { metric: breed_weight } = weight;
  return {
    name,
    image_url,
    bred_for,
    temperament,
    life_span,
    breed_weight,
    origin,
    breed_group,
  };
};

export default function Content() {
  const [breeds, setBreeds] = useState(undefined);
  const [results, setResults] = useState(undefined);
  const [fuse, setFuse] = useState(undefined);
  const [pattern, setPattern] = useState("");
  const [loading, setLoading] = useState(true);

  // Get the breeds and initialize Fuzzy search object
  useEffect(() => {
    async function getBreeds() {
      try {
        const response = await fetch(
          `https://api.thedogapi.com/v1/breeds?apiKey=${process.env.REACT_APP_DOG_API_KEY}`
        );
        const list = await response.json();
        const clean = list.map(cleanResults);
        setFuse(new Fuse(clean, options));
        setBreeds(clean);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getBreeds();
  }, []);

  // asynchronous onChange for search pattern
  useEffect(() => {
    async function getResults(list) {
      if (pattern.length === 0)
        return list.map((breed) => {
          return { item: breed };
        });

      return fuse.search(pattern);
    }

    if (breeds) {
      setLoading(true);
      const timeOutId = setTimeout(() => {
        getResults(breeds).then((res) => {
          setResults(res);
          setLoading(false);
        });
      }, 500);
      return () => clearTimeout(timeOutId);
    }
  }, [pattern, breeds, fuse]);

  function renderContent() {
    switch (true) {
      case loading:
        return (
          <Grid item xs={12} container spacing={2} justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
              <img src={loader} alt="Loader" width="100%" height="auto" />
            </Grid>
          </Grid>
        );
      case results.length === 0:
        return (
          <Grid item xs={12} container spacing={2} justify="center">
            <Grid item xs={12} container spacing={2} justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <img src={paw} alt="Paw" width="100%" height="auto" />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2} justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <Typography color="primary" align="center" variant="h3">
                  Nothing here
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      default:
        return results.map((result, idx) => (
          <HeroCard result={result} key={idx} />
        ));
    }
  }

  return (
    <Grid item xs={12} container justify="center" spacing={5}>
      <Grid item xs={12} container justify="center" spacing={2}>
        <TextField
          fullWidth
          id="pattern"
          name="pattern"
          label="Search"
          color="primary"
          value={pattern}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          onChange={(e) => setPattern(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} container justify="center" spacing={2}>
        {renderContent()}
      </Grid>
    </Grid>
  );
}
