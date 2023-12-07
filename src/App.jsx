import { Outlet } from 'react-router-dom';
import { StateProvider } from './config/StateContext.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import { registerUser } from './services/authServices.js';
import './App.css'

function App() {
  
  function onClick(event) {
    event.preventDefault();
    const data = {
      username: 'brdo123',
      email: 'josh@gmail.com',
      password: 'Hartley.1',
      passwordConfirm: 'Hartley.1'
    }
    registerUser(data).then((response) => {
      console.log(response.message);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }

  return (
    <>
      <StateProvider>
        <Nav />
        <button onClick={onClick} >Click me to register</button>
        <main>
          <Outlet />
        </main>
        <Footer />
      </StateProvider>
    </>
  )
}

export default App
