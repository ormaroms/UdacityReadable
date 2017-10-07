import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addComment, addPost, getCategories} from '../actions'

class AddComment extends Component {

    componentDidMount(){
    }

    constructor(props) {
    super(props);
    this.state = {
                  body:'',
                  author: ''
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const target = event.target;
      const value = target.value
      const name = target.name
      this.setState({
          [name] : value
      })
  }
  

  handleSubmit(event) {
    this.props.addComment({author: this.state.author, body: this.state.body, timestamp: Date.now(), id: Math.random().toString().slice(2), parentId: this.props.parentId})
    event.preventDefault()
  }

    render() {
        return(
            <div>
                <h4>Add Comment</h4>
                   <div className="row">
                     <form className="col s6" onSubmit={this.handleSubmit}>  
                           <div className="row">  
                               <div className="input-field col s6">
                                     <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
                                    <label htmlFor="title">Author</label>
                                </div> 
                            </div> 
                            <div className="row">  
                               <div className="input-field col s6">
                                     <input type="text" name="body" value={this.state.body} onChange={this.handleChange} /> 
                                    <label htmlFor="body">Body</label>
                                </div> 
                            </div>                         
                             <input className="waves-effect waves-light btn-large light-blue accent-4" type="submit" value="Add Comment" />

                     </form>
                </div>      
            </div>
        )
    }
}

function mapStateToProps({posts, comments}) {
  return {posts, comments}
}

export default connect(mapStateToProps, {addComment, addPost, getCategories})(AddComment)