import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Planet {
  [key:string]: string;
}

async function loadPlanetsData() {
  const path = join('.', 'kepler_exoplanets_nasa.csv');

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: '#'
  });

  Deno.close(file.rid);
  
  const planets = (result as Planet[]).filter((planet) => {
    const planetDisposition = planet['koi_disposition'] === 'CONFIRMED';
    const planetRadius = Number(planet['koi_prad']) > 0.5 && Number(planet['koi_prad']) < 1.5;
    const stellarMass = Number(planet['koi_smass']) > 0.78 && Number(planet['koi_smass']) < 1.04;
    const stellarRadius = Number(planet['koi_srad']) > 0.99 && Number(planet['koi_srad']) < 1.01;
    return planetDisposition && planetRadius && stellarMass && stellarRadius;
  });

  return planets.map((planet) => {
    return _.pick(planet, [
      'koi_prad',
      'koi_smass',
      'koi_srad',
      'kepler_name',
      'koi_count',
      'koi_steff',
      'koi_period'
    ])
  });
}

const newEarths = await loadPlanetsData();

console.log(`Habbitable planets found -> ${newEarths.length}`);
for (const planet of newEarths) {
  console.log(planet);
  
}

