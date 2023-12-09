import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import {useContext, useState} from 'react';
import AppContext from '../config/StateContext';
import Logo from '../assets/logo.svg';
import IconHamburger from '../assets/icon-hamburger.svg';
import IconClose from '../assets/icon-close.svg';
const NavEl = styled.nav`
  /* background-color: black; */
  position: relative;
  background: linear-gradient(135deg, #FF8F71 0%, #FF3E55 100%);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  align-items: center;
  

  ul {
    position: absolute;
    width: 90%;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    top: 105%;
    background: #FFF;
    border-radius: 0.3125rem;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.24);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    transform-origin: top;
    list-style: none;
  }

  .menu-lrg {
    display: none;
  }

  li {
    text-align: center;
    color: #1F3E5A
  }

  
  .login {
    padding: 0.95rem 2.5rem;
    border-radius: 1.75rem;
  }

  .register {
    padding: 0.95rem 2.5rem;
    border-radius: 1.75rem;
    color: #FFF;
    background: linear-gradient(135deg, #FF8F71 0%, #FF3E55 100%);
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  @media (min-width: 768px) {

    .menu-lrg {
      all: unset;
      display: flex;
      gap: 2rem;
      flex-grow: 1;
      justify-content: end;
      list-style: none;
    }

    .posts-link {
      margin-right: auto;
    }
    .sm {
      display: none;
    }
  }
`
const Nav = () => {
  const {store, dispatch} = useContext(AppContext);
  const {loggedInUser} = store;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = () => {
    /// handle dispatch here
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    })
    setIsMenuOpen(false);
  }
  
  return (
    <NavEl>
      <div className="logo-container">
        <img src={Logo} alt="BlogR logo"/>
      </div>
      {isMenuOpen && 
      <AnimatePresence >
        <motion.ul
          initial={{
            scaleY: 0,
          }}
          animate={{
            scaleY: 1,
          }}
          exit={{
            scaleY: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "backInOut",
          }}
        >
        {loggedInUser
        ?
          <>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                to="/profile"
                >
                  Profile
                </Link>
            </li>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                to='/posts'
                >
                  All Posts
                </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </>
        :
          <>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                className="login" 
                to="/login"
                >
                  Login
                </Link>
            </li>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                className="register" 
                to="/register"
                >
                  Register
                </Link>
            </li>
          </>
        }
        </motion.ul>
      </AnimatePresence>
        
      }
      <ul 
      
        className="menu-lrg"
      >
        {loggedInUser
        ?
          <>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                to="/profile"
                >
                  Profile
                </Link>
            </li>
            <li className="posts-link">
              <Link 
                
                onClick={() => setIsMenuOpen(false)}
                to='/posts'
                >
                  All Posts
                </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </>
        :
          <>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                className="login" 
                to="/login"
                >
                  Login
                </Link>
            </li>
            <li>
              <Link 
                onClick={() => setIsMenuOpen(false)}
                className="register" 
                to="/register"
                >
                  Register
                </Link>
            </li>
          </>
        }
      </ul>
      {isMenuOpen 
      ? <button 
          type="button" 
          className='hamburger sm'
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={IconClose} alt="Open menu button"/>
        </button>
      : <button 
          type="button" 
          className='hamburger sm'
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={IconHamburger} alt="Open menu button"/>
        </button>
      }
      
      
      
    </NavEl>
  )
}

export default Nav;
