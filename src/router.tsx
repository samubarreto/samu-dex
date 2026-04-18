import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import PokeDetailed from './pages/PokeDetailed'
import Favourites from './pages/Favourites'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'details/:pokemonId',
        element: <PokeDetailed />
      },
      {
        path: 'favourites',
        element: <Favourites />
      }
    ],
  },
])