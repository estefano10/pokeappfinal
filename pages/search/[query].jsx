import React from 'react'
import { Grid, Text, Card, Row } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import {getPokemonInfo} from './../../utils/getPokemonInfo'
import ListPokemons from '../../components/pokemon/ListPokemons';




const SearchPage = ({pokemon}) => {
    const router = useRouter()
  return (
    <Grid.Container css={{marginTop: '5px'}} gap={2}>
        {pokemon && (
            <Grid xs={12}>
                <Text>
                    <h2>Encontramos un pokemon</h2>
                </Text>
            </Grid>
        )}
        <Grid xs={12} sm={4} >
            {pokemon && (
                <Card isPressable onPress={()=> router.push(`/name/${pokemon.name}`)}>
                    <Card.Body css={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        <Card.Image
                        alt={pokemon.name}
                        width= '100%'
                        height={200}
                        src= {pokemon.sprites.other?.dream_world.front_default || '/images/pokebola.png'}>
                        

                        </Card.Image>
                    </Card.Body>

                    <Card.Footer>
                        <Row justify='space-between' css={{ px: '10px'}}>
                            <Text h3 css={{textTransform:'capitalize'}}>{pokemon.name}</Text>
                            <Text h4 css={{textTransform:'capitalize'}}>#{pokemon.id}</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            )}
        
        {!pokemon &&(
        
        <Row justify='center' css={{display: 'flex', flexDirection: 'column'}}>
        <Text h2>No encontramos ningun Pokemon </Text>
        <Text h3>Te recomendamos estos Pokemones</Text>
        <ListPokemons></ListPokemons>
        </Row>
        
        )}
        </Grid>
    </Grid.Container>
  )
}

export default SearchPage

export const getServerSideProps = async ({params}) => {
    const {query = ''} = params;
    if(query.length === 0){
        return{
            redirect:{
                destination: '/',
                permanent : true,
            }
        }
    }
    let pokemon = await getPokemonInfo(query.toLowerCase())

    return{
        props:{
            pokemon,

        }

    }
}