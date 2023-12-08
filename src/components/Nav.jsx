import {Link} from 'react-router-dom';
import {useContext} from 'react';
import AppContext from '../config/StateContext';


const Nav = () => {
  const {dispatch} = useContext(AppContext);

  const handleSignOut = () => {
    /// handle dispatch here
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    })
    
  }
  
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={handleSignOut}>Sign out</button>
    </nav>
  )
}

export default Nav;
