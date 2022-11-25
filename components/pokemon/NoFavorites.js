import { Container, Text, Image } from '@nextui-org/react'
import React from 'react'

const NoFavorites = () => {
  return (
    <Container>
       <Text> <h1>No hay Favoritos</h1></Text>

       <Image src= 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg' width={250} height={250} />
       
    </Container> 
    
    

   
  )
}
export default NoFavorites