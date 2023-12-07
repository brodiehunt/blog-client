import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import BlogPosts from './pages/BlogPosts.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NewPost from './pages/NewPost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import Profile from './pages/Profile.jsx';


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
          element: <BlogPosts />,
        },
        {
          path: '/posts/new',
          element: <NewPost />,
        },
        {
          path: '/posts/:postId',
          element: <BlogPost />,
        },
        {
          path: '/posts/:postId/update',
          element: <UpdatePost />,
        },
        {
          path: '/profile',
          element: <Profile />,
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}


export default Router;