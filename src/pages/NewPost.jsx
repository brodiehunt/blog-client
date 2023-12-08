import {useContext} from 'react';
import PostForm from '../components/PostForm.jsx';
import { addBlogPost } from '../services/postServices.js';
import {useNavigate} from 'react-router-dom'
import AppContext from '../config/StateContext.jsx';


const NewPost = ({}) => {
  const {dispatch} = useContext(AppContext);
  const navigate= useNavigate();
  const initialData = {
    title: '',
    content: '',
    published: false
  }

  const newBlogPost = async (blogData) => {
    try {
      const response = await addBlogPost(blogData);
      if (response.error) {
        return response;
      }
      dispatch({
        type: 'addBlogPost',
        data: response.post
      })
      navigate(`/posts/${response.post._id}`)
      return response;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <PostForm 
        apiFunc={newBlogPost}
        initialData={initialData} 
        type="Add"
      />
    </div>
  )
}

export default NewPost;