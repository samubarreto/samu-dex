import type { PokemonListItem } from '../../types/pokemon'
import PokeCard from '../PokeCard'
import { Grid } from './styles'

type PokeGridProps = {
  pokemons: PokemonListItem[]
  typeMap?: Map<number, string[]>
}

export default function PokeGrid({ pokemons, typeMap }: PokeGridProps) {
  return (
    <Grid>
      {pokemons.map((pokemon) => (
        <PokeCard key={pokemon.id} pokemon={pokemon} types={typeMap?.get(pokemon.id)} />
      ))}
    </Grid>
  )
}