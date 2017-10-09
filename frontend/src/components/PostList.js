import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, getPostComments, deletePost, voteOnPost, deleteComment, voteOnComment, sortPost } from '../actions'
import Post from './Post'
import AllCategories from './AllCategories'

class PostList extends Component {
    componentDidMount() {
        const { getPosts } = this.props
        getPosts()
    }

    render() {
        const { posts, match } = this.props

        const category = (match && match.params && match.params.category)
            ? match.params.category
            : null

        if (posts != null && category != null)
            var filteredPosts = getCategoryPosts(posts, category)

        return (
            <div>
                <AllCategories />
                <div>
                    <p>Sort</p>
                    <button onClick={() => sortPost("timestamp")}>Time</button>
                    <button onClick={() => sortPost("voteScore")}>VoteScore</button>
                </div>
                <h4>{category} posts:</h4>

                {filteredPosts && filteredPosts.map((post) => (
                    <Post post={post} key={post.id} isRaedMoreBtn= {true}/>
                ))}
            </div>
        )
    }
}

function getCategoryPosts(posts, category) {
    return posts.filter((post) => post.category === category)
}

function mapStateToProps({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps, { getCategories, getPosts, getPostComments, deletePost, voteOnPost, deleteComment, voteOnComment, sortPost })(PostList)