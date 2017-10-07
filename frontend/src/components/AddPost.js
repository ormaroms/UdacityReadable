import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, addPost } from '../actions'
import AllCategories from './AllCategories'

class AddPost extends Component {

    componentDidMount() {
        const { getCategories } = this.props
        getCategories()
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            author: '',
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
        this.props.addPost({ title: this.state.title, author: this.state.author, body: this.state.body, category: this.state.category, timestamp: Date.now(), id: Math.random().toString().slice(2) }, () => this.props.history.push('/'))
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <AllCategories />

                <h4>Add Post</h4>
                <div className="row">
                    <form className="col s6" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                                <label htmlFor="title">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                                <label htmlFor="author">Author</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                                <label htmlFor="body">Body</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                                <label htmlFor="category">category</label>
                            </div>
                        </div>
                        <input className="waves-effect waves-light btn-large light-blue accent-4" type="submit" value="Submit" />

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps, { addPost, getCategories })(AddPost)