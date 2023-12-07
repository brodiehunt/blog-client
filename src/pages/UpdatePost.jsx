import PostForm from '../components/PostForm.jsx';

const UpdatePost = () => {
  const initialData = {
    title: 'There is initial data here',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam architecto repellendus veritatis quia iste reprehenderit impedit, recusandae minus qui aut omnis optio facere necessitatibus repellat voluptates nihil soluta atque magni!',
    published: true
  }
  return (
    <div>
      <PostForm 
        initialData={initialData} 
        type="Update"
      />
    </div>
  )
}

export default UpdatePost;