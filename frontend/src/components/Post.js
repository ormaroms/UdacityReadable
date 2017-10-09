import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, voteOnPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {
  componentDidMount() {
    const { getCategories, getPosts } = this.props
    getCategories()
    getPosts()
  }

  render() {
    const { post, voteOnPost, deletePost, isRaedMoreBtn } = this.props
    return (
      <div>

        <div className="row">
          <div className="post">
            <div className="card light-blue lighten-4">
              <div className="card-content  light-blue lighten-4">
                <span className="post-title" style={{ fontWeight: "bold" }}>{post.title}</span>
                <p>{(new Date(post.timestamp)).toLocaleString()}</p>
                <p className="blue-grey-text text-blue-grey lighten-5">{post.author}</p>
                <p>{post.body}</p>
                <i className="material-icons">grade</i>{post.voteScore}

                {isRaedMoreBtn ?
                  <div><Link to={`/${post.category}/${post.id}`}> <button className="btn-floating halfway-fab btn-large waves-effect waves-light light-blue accent-4">Read More</button></Link></div> : <div>
                  <span className="likes" onClick={() => voteOnPost(post.id, "upVote")}><i className="material-icons">thumb_up</i></span>
                  <span className="likes" onClick={() => voteOnPost(post.id, "downVote")}><i className="material-icons">thumb_down</i></span>
                  <span className="likes" onClick={() => deletePost(post.id, () => this.props.history.push(`/${this.props.match.params.category}`))}><i className="material-icons">delete_forever</i></span>
                  <Link to={`/${post.category}/${post.id}/edit`}><button onClick={this.changeEditMode} className="btn-floating halfway-fab btn-large waves-effect waves-light light-blue accent-4"><i className="material-icons">edit</i></button></Link></div>}

              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return { posts, comments }
}

export default connect(mapStateToProps, { getCategories, getPosts, voteOnPost, deletePost })(Post)