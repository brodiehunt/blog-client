import api from '../config/api';

export const getBlogPosts = async () => {
  try {
    const response = await api.get('/api/user/posts');
    console.log('response', response);
    return response.data;
  } catch (error) {
    return {error: 'An error occured while fetching posts.'}
  }
}

export const addBlogPost = async (postData) => {
  try {
    const response = await api.post('/api/user/posts', (postData));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {error: error.message};
  }
}

export const updateBlogPost = async (postData) => {
  try {
    const response = await api.put(`/api/user/posts/${postData._id}`, (postData));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {error: error.message};
  }
}