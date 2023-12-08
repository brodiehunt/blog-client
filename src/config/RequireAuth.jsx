import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from './StateContext';


const RequireAuth = ({children}) => {
  const {store} = useContext(AppContext);
  const isLoggedIn = store.loggedInUser;

  if (!isLoggedIn) {
    return <Navigate to='/login'/>
  }

  return children;
}

export default RequireAuth;