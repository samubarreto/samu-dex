import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'
import { GlobalStyle } from './styles/GlobalStyle'

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const Main = styled.main`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 24px 24px 48px;

  @media (max-width: 768px) {
    padding: 20px 16px 36px;
  }
`

function App() {
  return (
    <Shell>
      <GlobalStyle />
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </Shell>
  )
}

export default App
