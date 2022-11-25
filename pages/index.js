import { Grid } from "@nextui-org/react";

import pokeApi from "../apis/pokeApi";
import Layout from "../components/layout/Layout";
import PokemonCard from "../components/pokemon/PokemonCard";
import { useEffect, useState } from "react";


export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const getData = async () => {
    const {data} = await pokeApi.get('/pokemon?limit=151');
    
    setPokemons (data.results.map((pokemon, index) => ({
      id:index + 1,
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
    })))
    
  }
  
  useEffect(() => {
    getData();
  }, [])

  console.log(pokemons);
  
  return (
    <Layout title={"listado de pokemons"}>
      <Grid.Container gap={2} justify="flex-start">
     {pokemons.map((pokemon)=>(
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))} 
        
        
      </Grid.Container>
    </Layout>
  );
}

// export const getStaticProps = async (ctx) =>{
  
//   const {data} = pokeApi.get('/pokemon?limit=151');

//   const pokemons = data.results.map((poke, i) =>({
//     ...poke,
//     id:i + 1,
//     image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`,}))

  

//   const dataTypes = await pokeApi.get('/type');
//   const types = dataTypes.data.results.map((type, i) => ({
//     ...type,
//     id:i + 1,
//   }));
//   return (
     
//       pokemons
//       
    
//   )
// }