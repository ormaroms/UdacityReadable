import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPost } from '../actions'
import Post from './Post'
import AllCategories from './AllCategories'

class PostList extends Component {

    render() {
        const { posts, match, sort } = this.props

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
                    <button onClick={() => sort("timestamp")}>Time</button>
                    <button onClick={() => sort("voteScore")}>VoteScore</button>
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

function mapDispatchToProps (dispatch) {
    return {
        sort: (data) => dispatch(sortPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)