import type { PokemonListItem } from '../../types/pokemon'
import PokeCard from '../PokeCard'
import { Grid } from './styles'

type PokeGridProps = {
  pokemons: PokemonListItem[]
}

export default function PokeGrid({ pokemons }: PokeGridProps) {
  return (
    <Grid>
      {pokemons.map((pokemon) => (
        <PokeCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid>
  )
}