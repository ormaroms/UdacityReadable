import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostComments } from '../actions'
import Comment from './Comment'

class Comments extends Component {

    render() {
        const { posts, postId, comments, getPostComments } = this.props

        if (posts != null && postId != null && comments == null) {
            getPostComments(postId)
        }

        return (
            <div>
                {comments != null && comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ comments, posts }) {
    return { comments, posts }
}

export default connect(mapStateToProps, { getPostComments })(Comments)