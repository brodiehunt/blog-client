import {useNavigate, Link, useParams } from 'react-router-dom';
import {useContext} from 'react';
import AppContext from '../config/StateContext';
import { deleteBlogPost } from '../services/postServices';

const BlogPost = () => {
  const {store, dispatch} = useContext(AppContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = store.blogPosts.find((item) => item._id === postId);

  const handleDelete = async () => {
    console.log('Delete function called');
    try {
      const response = await deleteBlogPost(post);
      if (response.error) {
        return setError(response.error.message);
      }
      dispatch({
        type: 'deleteBlogPost',
        data: post,
      })
      navigate('/posts');
      console.log(response);
    } catch (error) {
      console.error(error);
      navigate('/error', {message: error.message});
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
      <Link to={`/posts/${postId}/update`}>Update</Link>
      <h1>{post.title}</h1>
      <span>Created: {post.create_date}</span>
      <div>{post.title}</div>
    </div>
  )
}

export default BlogPost;