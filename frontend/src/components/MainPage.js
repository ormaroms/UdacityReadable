import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, getPostComments, sortPost } from '../actions'
import Post from './Post'
import AllCategories from './AllCategories'

class MainPage extends Component {
    componentDidMount() {
        const { getCategories, getPosts, sortPost, posts } = this.props
        getCategories()
        getPosts()
        if (posts != null) {
            sortPost("voteScore")
        }
        
    }

    render() {
        const { posts, sortPost } = this.props

        return (
            <div>
                <AllCategories />
                <div>
                    <p>Sort</p>
                    <button onClick={() => sortPost("timestamp")}>Time</button>
                    <button onClick={() => sortPost("voteScore")}>VoteScore</button>
                </div>
                {posts && posts.map((post) => (
                    <Post post={post} key={post.id} isRaedMoreBtn={true}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps, { getCategories, getPosts, getPostComments, sortPost })(MainPage)
