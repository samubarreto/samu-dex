import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import PokeDetailed from './pages/PokeDetailed'
import Favourites from './pages/Favourites'
import RouteErrorPage from './pages/RouteError'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <RouteErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'details/:pokemonId',
        element: <PokeDetailed />,
        errorElement: <RouteErrorPage />,
      },
      {
        path: 'favourites',
        element: <Favourites />,
        errorElement: <RouteErrorPage />,
      }
    ],
  },
], {
  basename: '/samu-dex/'
})