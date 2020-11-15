import React,{useState,useEffect,useContext} from 'react'

import {useQuery} from '@apollo/client'

import {AuthContext} from '../services/context/auth'

import {FETCH_POSTS_QUERY} from '../services/graphql/queries'

import PostForm from '../components/PostForm'

import { Grid , Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard'

function Home() {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const {loading, data={}} = useQuery(FETCH_POSTS_QUERY,{
    pollInterval: 500,
  });


  useEffect(() => {
    setPosts(data.getPosts);
  },[data.getPosts]);

  return (
    <Grid columns={3}>
      <Grid.Row style={{marginTop: 20, marginBottom: 10,marginLeft: 30}}>
        <h1>Recent activity</h1>
      </Grid.Row>
    <Grid.Row>
      <Grid.Column width={14}>
      {user && (
        <Grid.Column>
          <PostForm/>
        </Grid.Column>
      )}
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      {loading ? (
        <h1>Loading...</h1>
      ) : (<Transition.Group>
        {(posts && posts.map(post => (
        <Grid.Column mobile={16} tablet={8} computer={4} key={post.id} style={{marginBottom: 20}}>
          <PostCard post={post}/>
        </Grid.Column>
      )))}
      </Transition.Group>)}
    </Grid.Row>
  </Grid>
  )
}



export default Home
