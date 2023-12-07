import {Link} from 'react-router-dom';

const Nav = () => {

  const handleSignOut = () => {
    /// handle dispatch here
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