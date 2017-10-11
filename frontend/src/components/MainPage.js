import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPost } from '../actions'
import Post from './Post'
import AllCategories from './AllCategories'

class MainPage extends Component {
    componentDidMount() {
        const { sort, posts } = this.props
        if (posts != null) {
            sort("voteScore")
        }
        
    }

    render() {
        const { posts, sortPost, sort } = this.props

        return (
            <div>
                <AllCategories />
                <div>
                    <p>Sort</p>
                    <button onClick={() => sort("timestamp")}>Time</button>
                    <button onClick={() => sort("voteScore")}>VoteScore</button>
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

function mapDispatchToProps (dispatch) {

    return {
        sort: (data) => dispatch(sortPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
