import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from '../App.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import BlogPosts from '../pages/BlogPosts.jsx';
import BlogPost from '../pages/BlogPost.jsx';
import NewPost from '../pages/NewPost.jsx';
import UpdatePost from '../pages/UpdatePost.jsx';
import Profile from '../pages/Profile.jsx';
import RequireAuth from './RequireAuth.jsx';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/error',
          element: <ErrorPage />
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/posts',
          element: <RequireAuth><BlogPosts /></RequireAuth>,
        },
        {
          path: '/posts/new',
          element: <RequireAuth><NewPost /></RequireAuth>,
        },
        {
          path: '/posts/:postId',
          element: <RequireAuth><BlogPost /></RequireAuth>,
        },
        {
          path: '/posts/:postId/update',
          element: <RequireAuth><UpdatePost /></RequireAuth>,
        },
        {
          path: '/profile',
          element: <RequireAuth><Profile /></RequireAuth>,
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}


export default Router;