import { pokeApi } from "../apis"

export const getPokemonAbility = async (nameOrId) => {
    try {
        const {data}= await pokeApi.get(`/ability/${nameOrId}`)
        return {

            name:data.name, 
            text: data.flavor_text_entries.filter(text => (text.language.name=='es')) [0]
        }
    } catch (error) {
        null
    }
}