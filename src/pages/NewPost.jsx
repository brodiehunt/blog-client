import PostForm from '../components/PostForm.jsx';
import { addBlogPost } from '../services/postServices.js';
const NewPost = ({}) => {
  const initialData = {
    title: '',
    content: '',
    published: false
  }
  return (
    <div>
      <PostForm 
        apiFunc={addBlogPost}
        initialData={initialData} 
        type="Add"
      />
    </div>
  )
}

export default NewPost;