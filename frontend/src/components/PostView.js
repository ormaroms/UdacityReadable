import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, voteOnPost, deletePost, getPostComments } from '../actions'
import Post from './Post'
import Comment from './Comment'
import AddComment from './AddComment'
import AllCategories from './AllCategories'

class PostView extends Component {
    componentDidMount() {
        const { getCategories, getPosts } = this.props
        getCategories()
        getPosts()
    }

    render() {
        const { posts, match, getPostComments, comments } = this.props

        const postId = (match && match.params && match.params.id)
            ? match.params.id
            : null

        getPosts()

        if (posts != null && postId != null) {
            var post = getPostById(posts, postId)
            getPostComments(postId)
        }

        return (
            <div>
                <AllCategories />
                {post != null && (<div><Post post={post} key={post.id} isRaedMoreBtn={false} history={this.props.history} match={this.props.match} />
                    <div><h4>Comments : {comments!= null && comments.length}</h4></div>
                    
                <div>
                    {comments != null && postId != null && posts != null && comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
                <AddComment parentId={postId} /></div>)}
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }) {
    return { posts, comments }
}

function getPostById(posts, postId) {
    return posts.filter((post) => post.id === postId)[0]
}

export default connect(mapStateToProps, { getCategories, getPosts, voteOnPost, deletePost, getPostComments })(PostView)