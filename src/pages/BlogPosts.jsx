import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import AppContext from '../config/StateContext';
import {getBlogPosts} from '../services/postServices.js';

const BlogPosts = () => {
  const {store, dispatch} = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    getBlogPosts().then((response) => {
      if (response.error) {
        return setFetchError(response.error);
      }
      dispatch({
        type: "setBlogPosts",
        data: response.posts
      })
      setFetchError(null);
    })
    .catch((error) => {
      navigate('/error', {message: error.message})
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [])

  // Construct the BlogPost Cards Here. 
  const posts = store.blogPosts.map((item) => {
    return (
      <div key={item._id}>
        {item.title}
        <Link to={`/posts/${item._id}/update`} >Update</Link>
      </div>
    )
  })
  return (
    <>
      {posts}
      {isLoading && <div>Loading...</div>}
      {fetchError && <div>{fetchError}</div>}
      {store.blogPosts.length === 0 && <div>You have no blog posts</div>}
      <div>This is the all blog posts component</div>
      
      <Link to="/posts/new">New Post</Link>
      <Link to="/posts/1/update">Update Post</Link>
      <Link to="/profile">Go to Profile</Link>
    </>
    
  )
}

export default BlogPosts;