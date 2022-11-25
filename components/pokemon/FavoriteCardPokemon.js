import {useRouter} from 'next/router'
import { Grid, Card } from "@nextui-org/react";

const FavoriteCardPokemon = ({pokemonId}) => {
    
    const router = useRouter()

    const onFavoriteClicked = () => {
        router.push(`/name/${pokemonId}`)
    }
    return ( 
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={onFavoriteClicked}>
            <Card isHoverable isPressable css={{padding:10}}>
                <Card.Image
                src = {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`} 
                width={"100%"} 
                height={140}
                >

                </Card.Image>
            </Card>
        </Grid>
     );
}
 
export default FavoriteCardPokemon;