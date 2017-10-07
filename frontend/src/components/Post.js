import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, voteOnPost } from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {
  componentDidMount() {
    const { getCategories, getPosts } = this.props
    getCategories()
    getPosts()
  }

  render() {
    const { post } = this.props

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
                <div className="row  pull-right">
                  <Link to={`/${post.category}/${post.id}/edit`}><span className="btn-floating halfway-fab btn-large waves-effect waves-light light-blue accent-4"><i className="material-icons">edit</i></span></Link>
                </div>

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

export default connect(mapStateToProps, { getCategories, getPosts, voteOnPost })(Post)