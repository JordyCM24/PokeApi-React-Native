import {POKEMON_TYPE_COLORS} from './constante';

const getColorByPokemonType = (type) => {
  if (!type || typeof type !== 'string') {
    return '#A8A8A8'; // Color predeterminado 
  }
  return POKEMON_TYPE_COLORS[type.toLowerCase()] || '#A8A8A8'; // Color predeterminado si no coincide el tipo
};

export default getColorByPokemonType;