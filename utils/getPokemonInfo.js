import { pokeApi } from "../apis"

export const getPokemonInfo = async (nameOrId) => {
    try {
        const {data}= await pokeApi.get(`/pokemon/${nameOrId}`)
        return {
            ...data
        }
    } catch (error) {
        return null
    }
}
export default getPokemonInfo