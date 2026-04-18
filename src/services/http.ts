import axios from 'axios'

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

export const pokeApiClient = axios.create({
  baseURL: POKEAPI_BASE_URL,
})

export function isRequestCanceled(error: unknown) {
  return axios.isAxiosError(error) && error.code === 'ERR_CANCELED'
}