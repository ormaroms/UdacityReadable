import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_POST_COMMENTS,
  VOTE_ON_POST,
  DELETE_COMMENT,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  EDIT_COMMENT,
  ADD_COMMENT,
  VOTE_ON_COMMENT,
  SORT_POST
} from '../actions'

export function categories(state = null, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      var categories = action.categories.map((category) => (category.name));
      return categories

    default:
      return state
  }
}

export function posts(state = null, action) {

  const { posts, post } = action

  switch (action.type) {
    case GET_POSTS:
      return posts

    case DELETE_POST:
      return state.filter(post => post.id !== action.postId)

    case ADD_POST:
      return state.concat([post])

    case VOTE_ON_POST:
      debugger
      return state.map(post => {
        if (post.id === action.post.id) {
          debugger;
          if (action.vote === "upVote") {
            post.voteScore += 1
          }
          if (action.vote === "downVote") {
            post.voteScore -= 1
          }
        }
        return post
      })

    case EDIT_POST:
      return state.map(post => {
        if (post.id === action.post.id) {
          post = action.post
        }
        return post
      })

    case SORT_POST:
      return [].concat(state.sort(sortBy("-" + action.sortKey)))

    default:
      return state
  }
}

export function comments(state = null, action) {
  const { comments, comment, type } = action
  
  switch (type) {
    case GET_POST_COMMENTS:
      if (comments) {
        return comments
      } else {
        return state
      }

    case ADD_COMMENT:
      return state.concat([comment])

    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id)

    case VOTE_ON_COMMENT:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          if (action.vote === "upVote") {
            comment.voteScore += 1
          }
          if (action.vote === "downVote") {
            comment.voteScore -= 1
          }
        }
        return comment
      })

    case EDIT_COMMENT:
      state[state.findIndex(comment => comment.id = action.comment.id)].body = action.comment.body;
      state[state.findIndex(comment => comment.id = action.comment.id)].timestamp = Date.now();
      return state

    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})