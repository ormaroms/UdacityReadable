const APP_TOKEN = process.env.REACT_APP_API_TOKEN

export function header() {
  let Header = new Headers();
  Header.append("Accept", "application/json");
  Header.append("Authorization", APP_TOKEN);
  Header.append("Content-Type", "application/json");

  return Header;
}

export function getPosts () { 
    return fetch("http://localhost:3001/posts", {method: "GET", headers: header()})
        .then(res => res.json())
        .then(data => addCommentsToPosts(data))
}

export function getPostComments (postId) {
    return fetch(`http://localhost:3001/posts/${postId}/comments`, {method: "GET", headers: header()})
    .then(res => res.json())
    .then(data => data)
}

export function addCommentsToPosts(posts)
{
  debugger;
  const getComments = posts.map(post => getPostComments(post.id))
  return Promise.all(getComments).then(comments => {
    const fullPost = posts.map((post, index) => ({
      ...post,
      countComments: comments[index].length
    }))

    return fullPost
  })
}

export function getCategories () {
    return fetch("http://localhost:3001/categories", {method: "GET", headers: header()})
        .then(res => res.json())
        .then(data => data.categories)
}

export const delPost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'DELETE',
    headers: header()
  }).then(res => res.json())
  .then(data => data)

 export function addPost (post) {
    return fetch(`http://localhost:3001/posts`, {
    method: 'POST',
    headers: header(),
    body: JSON.stringify(post)
   }).then(res => res.json())
  }

   export function addComment (comment) {
    return fetch(`http://localhost:3001/comments`, {
    method: 'POST',
    headers: header(),
    body: JSON.stringify(comment)
   }).then(res => res.json())
  }

   export function editPost (post) {
     debugger;
     let title = post.title
     let body = post.body
     let id = post.id
    return fetch(`http://localhost:3001/posts/${id}`, {
    method: 'PUT',
    headers: header(),
    body: JSON.stringify({ title, body })
   }).then(res => res)
  }

  export function editComment (comment) {
    debugger;
     let body = comment.body
     let timestamp  = Date.now()
     let id = comment.id
    return fetch(`http://localhost:3001/comments/${id}`, {
    method: 'PUT',
    headers: header(),
    body: JSON.stringify({ body, timestamp })
   }).then(res => res)
  }

export const voteOnPost = (postId, option) =>
  fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'POST',
    headers: header(),
    body: JSON.stringify({option})
  }).then(res => res.json())

  export const voteOnComment = (commentId, option) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {
    method: 'POST',
    headers: header(),
    body: JSON.stringify({option})
  }).then(res => res.json())

  export const delComment = (commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {
    method: 'DELETE',
    headers: header()
  }).then(res => res.json())
  .then(data => data)
    