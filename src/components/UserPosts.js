import React,{useState} from 'react'

import {FETCH_USERPOSTS_QUERY} from '../services/graphql/queries'
import {useQuery} from '@apollo/client'

import {Card,Feed} from 'semantic-ui-react'

import moment from 'moment'
function UserPosts({username}) {
  const [errors,setErrors] = useState({});

  const {data={}} = useQuery(FETCH_USERPOSTS_QUERY,{
    variables:{
      username
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  })

  const thisUserPosts = data.getUserPosts;
  let postsMarkup;
  if(!thisUserPosts){
    if(errors){
    postsMarkup = (<p>Loading data.... </p>);
    }
  } else {
    postsMarkup = (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}'s posts</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
        {thisUserPosts.map((post) => (<Feed.Event key={post.id}>
          <Feed.Label image='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'/>
          <Feed.Content>
            <Feed.Date content={moment(post.createdAt).fromNow()}/>
            <Feed.Summary>{post.body}</Feed.Summary>
          </Feed.Content>
        </Feed.Event>))}
        </Feed>
      </Card.Content>
      </Card>
      );
  }

  return postsMarkup;
}



export default UserPosts
