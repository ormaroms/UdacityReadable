import * as API from '../utils/api'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SORT_POST = 'SORT_POST'

export const getCategories = () => dispatch => {
    return API.getCategories().then((categories) => {
        dispatch({ type: GET_CATEGORIES, categories })
    })
}

export const getPosts = () => dispatch => {
    return API.getPosts().then((posts) => {
        dispatch({ type: GET_POSTS, posts })
    })
}

export const editPost = (post, call) => dispatch => {
    return API.editPost(post).then((post) => {
        dispatch({ type: EDIT_POST, post })
    }).then(() => call())
}

export const editComment = (comment) => dispatch => {
    return API.editComment(comment).then((ggcomment) => {
        dispatch({ type: EDIT_COMMENT, comment })
    })
}

export const addComment = (comment) => dispatch => {
    return API.addComment(comment).then((post) => {
        dispatch({ type: ADD_COMMENT, comment })
    })
}

export const addPost = (post, call) => {
    return (dispatch) => {
        API.addPost(post).then(() => call())
        dispatch({ type: ADD_POST, post })
    }
}

export const getPostComments = (postId) => dispatch => {
    return API.getPostComments(postId).then((comments) => {
        dispatch({ type: GET_POST_COMMENTS, comments })
    })
}


export const deletePost = (postId, call) => {
    return (dispatch) => {
        API.delPost(postId).then(() => call())
        dispatch({ type: DELETE_POST, postId })
    }
}

export const voteOnPost = (postId, vote) => dispatch => {
    return API.voteOnPost(postId, vote).then((post) => {
        dispatch({ type: VOTE_ON_POST, post, vote })
    })
}

export const voteOnComment = (commentId, vote) => dispatch => {
    return API.voteOnComment(commentId, vote).then((comment) => {
        dispatch({ type: VOTE_ON_COMMENT, comment, vote })
    })
}

export const deleteComment = (commentId) => dispatch => {
    return API.delComment(commentId).then((comment) => {
        dispatch({ type: DELETE_COMMENT, comment })
    })
}

export const sortPost = (sortKey) => {
    return dispatch => {
        dispatch({ type: SORT_POST, sortKey })
    }
}
