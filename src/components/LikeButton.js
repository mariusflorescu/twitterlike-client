import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import {LIKE_POST_MUTATION} from '../services/graphql/mutations'
import {useMutation} from '@apollo/client'

import {Button,Icon,Label,Popup} from 'semantic-ui-react'

function LikeButton({user, post: {id,likeCount,likes}}) {
  const [liked,setLiked] = useState(false);

  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)){
      setLiked(true);
    } else {
      setLiked(false);
    }
  },[user,likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {postId: id}
  });

  const likeButton = user ? (
    liked ? (
      <Popup content="Unlike this post 😔!" inverted trigger={
      <Button color='purple'>
          <Icon name='heart' />
      </Button> }/>
    ) : (
      <Popup content="Like this post ♥️!" inverted trigger={
      <Button color='purple' basic>
          <Icon name='heart' />
        </Button>}/>
    )
  ) : (
    <Popup content="You must be logged in to like a post..." inverted trigger={
    <Button as={Link} to="/login" color='purple' basic>
          <Icon name='heart' />
    </Button> }/>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
        {likeButton}
        <Label as='a' basic color='purple' pointing='left'>
          {likeCount}
        </Label>
      </Button>
  )
}



export default LikeButton
