import { Outlet } from 'react-router-dom';
import { StateProvider } from './config/StateContext.jsx';
import GlobalStyles from './components/styles/Global.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import './App.css'

function App() {
  

  return (
    <>
      <GlobalStyles />
      <StateProvider>
        <Nav />
        
        <main>
          <Outlet />
        </main>
        <Footer />
      </StateProvider>
    </>
  )
}

export default App
