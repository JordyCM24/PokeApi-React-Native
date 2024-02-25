import {POKEMON_TYPE_COLORS} from './constante';

const getColorByPokemonType = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()];

export default getColorByPokemonType