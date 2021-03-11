import { Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import HeroCard from "./HeroCard";
import Fuse from "fuse.js";

export default function Content() {
  const [breeds, setBreeds] = useState([]);
  const [pattern, setPattern] = useState("");

  const results = useMemo(() => {
    if (pattern.length === 0)
      return breeds.map((breed) => {
        return { item: breed };
      });
    const options = {
      isCaseSensitive: true,
      includeScore: true,
      // shouldSort: true,
      // includeMatches: false,
      findAllMatches: true,
      minMatchCharLength: 0,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ["name", "temperament"],
    };

    const fuse = new Fuse(breeds, options);

    return fuse.search(pattern);
  }, [breeds, pattern]);

  useEffect(() => {
    async function getBreeds() {
      const response = await fetch(
        `https://api.thedogapi.com/v1/breeds?apiKey=${process.env.REACT_APP_DOG_API_KEY}&limit=8`
      );
      const json = await response.json();
      console.log({ json });
      setBreeds(json);
    }
    getBreeds();
  }, []);

  return (
    <Grid item xs={12} container justify="center" spacing={5}>
      <Grid item xs={12} container justify="center" spacing={2}>
        <TextField
          fullWidth
          id="pattern"
          name="pattern"
          label="Search"
          color="primary"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          onChange={(e) => {
            setPattern(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} container justify="center" spacing={2}>
        {results.length === 0
          ? "Nada"
          : results.map((result) => (
              <HeroCard result={result} key={result.id} />
            ))}
      </Grid>
    </Grid>
  );
}
