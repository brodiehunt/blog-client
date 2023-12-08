import {useContext} from 'react';
import PostForm from '../components/PostForm.jsx';
import { addBlogPost } from '../services/postServices.js';
import AppContext from '../config/StateContext.jsx';


const NewPost = ({}) => {
  const {dispatch} = useContext(AppContext);

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