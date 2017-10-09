import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import MainPage from './MainPage'
import PostList from './PostList'
import EditPost from './EditPost'
import AddPost from './AddPost'
import PostView from './PostView'
import '../App.css';

class App extends Component {
  
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
    reducers,
     composeEnhancers(
         applyMiddleware(thunk)
        )
    )

    return (
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage}/>
           <Route exact path="/add" component={AddPost}/> 
           <Route exact path="/:category" component={PostList}/> 
           <Route exact path="/:category/:id/edit" component={EditPost}/> 
           <Route exact path="/:category/:id" component={PostView}/>   
      </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;