import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, deletePost, getPostComments, voteOnPost, editPost, deleteComment, voteOnComment, addComment } from '../actions'
import AllCategories from './AllCategories'

class EditPost extends Component {
    componentWillMount() {
        const { posts, match, getPosts } = this.props
        const postId = (match && match.params && match.params.id)
            ? match.params.id
            : null

        getPosts()

        if (posts != null && postId != null) {
            var post = getPostById(posts, postId)
            this.setState({
                title: post.title,
                body: post.body
            });
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            category: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        this.props.editPost({ title: this.state.title, body: this.state.body, id: this.props.match.params.id },() => this.props.history.push(`/${this.props.match.params.category}/${this.props.match.params.id}`))
        event.preventDefault()
    }

    render() {
        const { posts, match, getPosts } = this.props
        const postId = (match && match.params && match.params.id)
            ? match.params.id
            : null

        getPosts()

        if (posts != null && postId != null) {
            var post = getPostById(posts, postId)
        }

        return (
            <div>
                <AllCategories />
                <h4>Post/Edit Post</h4>
                {post != null && (
                    <div className="row">
                        <form className="col s12 m11" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                                    <label htmlFor="title"></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input type="text" name="time" value={(new Date(post.timestamp)).toLocaleString()} disabled="true" />
                                    <label htmlFor="time"></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input type="text" name="author" value={post.author} disabled="true" />
                                    <label htmlFor="author"></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                                    <label htmlFor="body"></label>
                                </div>
                            </div>
                            <i className="material-icons">grade</i>{post.voteScore}
                            <div className="row"> <input className="waves-effect waves-light btn-large light-blue accent-4" type="submit" value="Submit" /></div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

function getPostById(posts, postId) {
    return posts.filter((post) => post.id === postId)[0]
}

function mapStateToProps({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps, { getCategories, getPosts, getPostComments, deletePost, voteOnPost, editPost, deleteComment, voteOnComment, addComment })(EditPost)