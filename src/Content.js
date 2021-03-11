import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

export default function Content() {

  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function getBreeds(){
      const response = await fetch(`https://api.thedogapi.com/v1/breeds?apiKey=${process.env.REACT_APP_DOG_API_KEY}`);
      const json = await response.json();

      console.log({json});
    }
  })

  return (
    <Grid item xs={12} container justify="center" spacing={2}>
      {
        breeds.length===0 ? 
        (
          "Nada"
        )
        :
        (
          `Hay algo`
        )

      }
    </Grid> 
  )
}
