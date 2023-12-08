import {useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import AppContext from '../config/StateContext.jsx';
import PostForm from '../components/PostForm.jsx';
import {updateBlogPost} from '../services/postServices.js';

const UpdatePost = () => {
  const {store, dispatch} = useContext(AppContext);
  const {postId} = useParams();
  console.log(postId);
  console.log();
  const initialData = store.blogPosts.find((item) => item._id === postId)
  console.log(initialData);
  console.log(store.blogPosts);
  


  const handleUpdateBlogPost = async (blogData) => {

    try {
      const response = await updateBlogPost(blogData);
      if (response.error) {
        return response;
      }
      console.log('update response', response.post);
      dispatch({
        type: "updateBlogPost",
        data: response.post
      })
      return response;
    } catch(error) {
      throw error;
    }
  }

  return (
    <div>
      <Link to="/posts">Go to posts</Link>
      <PostForm 
        apiFunc={handleUpdateBlogPost}
        initialData={initialData} 
        type="Update"
      />
    </div>
  )
}

export default UpdatePost;