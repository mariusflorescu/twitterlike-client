import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

//
import {AuthProvider} from './services/context/auth'

import AuthRoute from './services/AuthRoute'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostPage from './pages/PostPage'
import UserProfile from './pages/UserProfile'

//components
import MenuBar from './components/MenuBar'
import {Container} from 'semantic-ui-react'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path="/login" component={Login}/>
          <AuthRoute exact path="/register" component={Register}/>
          <Route exact path="/post/:postId" component={PostPage}/>
          <Route exact path="/user/:userName" component={UserProfile}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
