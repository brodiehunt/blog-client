import { Outlet } from 'react-router-dom';
import { StateProvider } from './config/StateContext.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import './App.css'

function App() {
  

  return (
    <>
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
