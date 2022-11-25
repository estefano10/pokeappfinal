import { Grid } from "@nextui-org/react";
import FavoriteCardPokemon from "./FavoriteCardPokemon";

const FavoritePokemons = ({pokemons}) => {
    return ( 
        <Grid.Container>
            {
                pokemons.map(id => {
                    <FavoriteCardPokemon key={id} pokemonId={id} />
                })
            }
        </Grid.Container>
     );
}
 
export default FavoritePokemons;