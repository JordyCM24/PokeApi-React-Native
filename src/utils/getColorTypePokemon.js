import {POKEMON_TYPE_COLORS_TYPES} from './constante';

const getColorTypePokemon = (type) => {
  if (!type || typeof type !== 'string') {
    return '#A8A8A8'; // Color predeterminado 
  }
  return POKEMON_TYPE_COLORS_TYPES[type.toLowerCase()] || '#A8A8A8'; // Color predeterminado si no coincide el tipo
};

export default getColorTypePokemon;