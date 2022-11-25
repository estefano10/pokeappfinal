import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react'

const PokemonCard = ({pokemon}) => {

    const router  = useRouter()
    const onClick = () =>{ router.push(`/name/${pokemon.name}`)
    }
    return ( 
        <Grid xs={6} sm={3} xl={2} key={pokemon.id}> 
            <Card 
             isHoverable
             isPressable 
             onClick={onClick}>
                
                <Card.Body css={{p:1}}>
                    <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} width='100%' height={140}/>
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text>{pokemon.name}</Text> <Text>#{pokemon.id}</Text>
                    </Row>
                </Card.Footer>
            </Card> </Grid> );
}
 
export default PokemonCard;