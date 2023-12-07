import PostForm from '../components/PostForm.jsx';
const NewPost = ({}) => {
  const initialData = {
    title: '',
    content: '',
    published: false
  }
  return (
    <div>
      <PostForm 
        initialData={initialData} 
        type="Add"
      />
    </div>
  )
}

export default NewPost;