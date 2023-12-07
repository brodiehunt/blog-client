import stateReducer from '../config/stateReducer';
// TESTS FOR THE STATE REDUCER
describe('state reducer tests', () => {
  

// SET LOGGED IN USER ACTION
  describe('setLoggedInUser action', () => {
    const initialState = {
      loggedInUser: null,
      blogPosts: []
    }
    const action = {
      type: 'setLoggedInUser',
      data: {
        username: 'brodie',
        email: 'brodie@gmail.com'
      }
    }
    it('loggedInUser should be defined after being added', () =>{
      const result = stateReducer(initialState, action);
      expect(result.loggedInUser).toBeDefined();
    })

    it('loggedInUser should have the value defined in action.data', () => {
      const newState = stateReducer(initialState, action);
      expect(newState.loggedInUser).toEqual(action.data);
    })

    it('should not effect the state of blogPost', () => {
      const newState = stateReducer(initialState, action);
      expect(newState.blogPosts).toEqual(initialState.blogPosts);
    })
  })

// SET BLOG POSTS ACTION
  describe('setBlogPosts action', () => {
    const initialState = {
      loggedInUser: null,
      blogPosts: []
    }
    const action = {
      type: 'setBlogPosts',
      data: [{post1: "hello"}, {post2: 'goodbye'}]
    }

    it('blogPost should have a length of two after action', () => {
      const newState = stateReducer(initialState, action);
      expect(newState.blogPosts.length).toEqual(2);
    })

    it('blogPost should have two posts with the same data in the action', () => {
      const newState = stateReducer(initialState, action);
      expect(newState.blogPosts).toEqual(action.data);
    })

    it('Should have no side effects that alter loggedInUser', () => {
      const newState = stateReducer(initialState, action);
      expect(newState.loggedInUser).toBe(null);
    })

    it('The previous state value should have no effect on the next val', () => {
      const stateOne = {
        loggedInUser: null,
        blogPosts: 10
      }
      const stateTwo = {
        loggedInUser: {username: 'hello'},
        blogPosts: {randomObject: 'hello'}
      }
      const stateThree = {
        loggedInUser: null,
        blogPosts: [{post1: "hello"}, {post2: 'goodbye'}]
      }

      const newState1 = stateReducer(stateOne, action);
      const newState2 = stateReducer(stateTwo, action);
      const newState3 = stateReducer(stateThree, action);
      expect(newState1).toEqual({loggedInUser: null, blogPosts: action.data});
      expect(newState2).toEqual({loggedInUser: {username: 'hello'}, blogPosts: action.data});
      expect(newState3).toEqual({loggedInUser: null, blogPosts: action.data});
    })
  })

  // ADD BLOG POST
  describe("addBlogPost action", () => {
    
    it('adds post to an empty state array', () => {
      const initialState = {loggedInUser: null, blogPosts: []}
      const action = {type: 'addBlogPost', data: {title: 'New post', description: 'newPost description'}}

      const newState = stateReducer(initialState, action);
      
      expect(newState.blogPosts).toEqual([action.data]);
    })

    it('adds post to a state array with other objects', () => {
      const initialState = {loggedInUser: null, blogPosts: [{post1: 'hello'}, {post2: 'goodbye'}]}
      const action = {type: 'addBlogPost', data: {title: 'New post', description: 'newPost description'}}

      const newState = stateReducer(initialState, action);
      
      expect(newState.blogPosts).toEqual([...initialState.blogPosts, action.data])
    })

    it('adding post doesnt effect loggedInUser', () => {
      const initialState = {loggedInUser: null, blogPosts: []}
      const action = {type: 'addBlogPost', data: {title: 'New post', description: 'newPost description'}}

      const newState = stateReducer(initialState, action);
      
      expect(newState.loggedInUser).toEqual(initialState.loggedInUser);
    })
  })

  describe("updateBlogPost Action", () => {
    const initialBlogPosts = [
      {id: 0, title: 'hello'},
      {id: 1, title: 'goodbye'},
      {id: 2, title: 'Why not both?'},
    ]
    const postToUpdate = {id: 1, title: 'i have been updated'}
    const action = {type: 'updateBlogPost', data: postToUpdate}

    it('should update the correct object', () => {
      const newState = stateReducer({loggedInUser: null, blogPosts: initialBlogPosts}, action);

      expect(newState.blogPosts.length).toBe(3);
      expect(newState.blogPosts).toEqual([
        {id: 0, title: 'hello'},
        {id: 1, title: 'i have been updated'},
        {id: 2, title: 'Why not both?'},
      ])
      expect(newState.loggedInUser).toBe(null);
    })
  })

  describe("deleteBlogPost action", () => {
    const initialBlogPosts = [
      {id: 0, title: 'hello'},
      {id: 1, title: 'goodbye'},
      {id: 2, title: 'Why not both?'},
    ]
    const postToDelete = {id: 1, title: 'goodbye'}
    const action = {type: 'deleteBlogPost', data: postToDelete}

    it('should delete the correct blogpost', () => {
      const newState = stateReducer({loggedInUser: null, blogPosts: initialBlogPosts}, action);

      expect(newState.blogPosts.length).toBe(2);
      expect(newState.blogPosts).toEqual([{id: 0, title: 'hello'}, {id: 2, title: 'Why not both?'}])
      expect(newState.loggedInUser).toBe(null);
    })
  })
})