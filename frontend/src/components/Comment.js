import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, deleteComment, getPostComments, voteOnComment, editComment } from '../actions'

class Comment extends Component {

    componentWillMount() {
        const { comment } = this.props
        if (comment != null) {
            this.setState({
                author: comment.author,
                body: comment.body
            });
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            body: '',
            author: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
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
        if (!this.state.isEditMode) {
            this.props.editComment({ body: this.state.body, id: this.props.comment.id, parentId: this.props.comment.parentId })
        }
        event.preventDefault()
    }

    changeEditMode() {
        this.setState(state => ({
            isEditMode: !state.isEditMode
        }));
    }

    render() {
        const { comment, deleteComment, voteOnComment } = this.props


        return (
            <div>

                {comment != null && (
                    <div className="row">
                        <form className="col s6" onSubmit={this.handleSubmit}>
                            <div className="post">
                                <div className="card light-blue lighten-4">
                                    <div className="card-content  light-blue lighten-4">
                                        Author: <input type="text" name="author" value={this.state.author} disabled="true" onChange={this.handleChange} />

                                        Body: <input type="text" name="body" value={this.state.body} disabled={!this.state.isEditMode} onChange={this.handleChange} />

                                        <i className="material-icons">grade</i>{comment.voteScore}

                                        <span className="likes" onClick={() => voteOnComment(comment.id, "upVote")}><i className="material-icons">thumb_up</i></span>
                                        <span className="likes" onClick={() => voteOnComment(comment.id, "downVote")}><i className="material-icons">thumb_down</i></span>
                                        <span className="likes" onClick={() => deleteComment(comment.id)}><i className="material-icons">delete_forever</i></span>

                                        {(this.state.isEditMode) ?
                                            <button type="submit" onClick={this.changeEditMode} className="btn-floating halfway-fab btn-large waves-effect waves-light light-blue accent-4"><i className="material-icons">save</i></button> :
                                            <button onClick={this.changeEditMode} className="btn-floating halfway-fab btn-large waves-effect waves-light light-blue accent-4"><i className="material-icons">edit</i></button>}


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>



                )}
            </div>
        )
    }
}

function mapStateToProps({ comments, posts, categories }) {
    return { comments, posts, categories }
}

export default connect(mapStateToProps, { getCategories, getPosts, getPostComments, deleteComment, voteOnComment, editComment })(Comment)