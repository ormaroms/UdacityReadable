import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCategories, getPosts} from '../actions'
import {Link} from 'react-router-dom'

class AllCategories extends Component {
    componentDidMount(){
        const {getCategories, getPosts} = this.props
        getCategories()
        getPosts()
    }

    render() {
        const {categories} = this.props

        return(
            <div>
                    <nav>
                    <div className="nav-wrapper tool-bar">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li key='all'><Link to='/'><b>all</b></Link></li>
                    {categories != null && categories.map((category) => (
                        <li key={category}>
                              <Link to={`/${category}`}>
                                <b>{category}</b>
                            </Link>  
                        </li>
                    ))}
                    <li key='add'><Link to='/add'><span className="btn btn-floating btn-large light-blue accent-4"><i className="material-icons">add</i></span></Link></li>
                    </ul>
                        </div>
                    </nav>
            </div>
        )
    }
}

function mapStateToProps({posts, categories}) {
  return {posts, categories}
}

export default connect(mapStateToProps, {getCategories, getPosts})(AllCategories)
