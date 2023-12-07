export default function stateReducer(state, action) {
  switch(action.type) {
    case "setLoggedInUser": {
      return {
        ...state,
        loggedInUser: action.data
      }
    }
    case "setBlogPosts": {
      return {
        ...state,
        blogPosts: action.data
      }
    }
    case "addBlogPost": {
      const newState = [...state.blogPosts];
      newState.push(action.data);
      return {
        ...state,
        blogPosts: newState
      }
    }
    case "updateBlogPost": {
      const newState = [...state.blogPosts];
      const updatedState = newState.map((item) => {
        if (item.id === action.data.id) {
          return action.data;
        }
        return item;
      })
      return {
        ...state,
        blogPosts: updatedState
      }
    }
    case "deleteBlogPost": {
      const newState = state.blogPosts.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        blogPosts: newState
      }
    }
    default:
      return state;
  }
}