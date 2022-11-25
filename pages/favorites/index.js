import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout/Layout';
import FavoritePokemons from '../../components/pokemon/FavoritesPokemons';
import NoFavorites from '../../components/pokemon/NoFavorites';
import localFavorites from '../../utils/localFavorites';

const Favorites = () => {
    const [favoritePokemons, setFavoritePokemons] = useState([]);

    useEffect(() =>{
        console.log("favoritos", localFavorites.pokemons());
        setFavoritePokemons(localFavorites.pokemons());
    }, []);

    
    
    return ( 
    <Layout title="Pokedex | Favoritos"> 
        
        {
            favoritePokemons.length > 0 ? 
            ( <NoFavorites />
            ) : (
            <FavoritePokemons pokemons={favoritePokemons} />)
        }
    </Layout> );
}
 
export default Favorites;