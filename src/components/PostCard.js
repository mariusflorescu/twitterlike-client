import React,{useContext} from 'react'
import {Link} from 'react-router-dom'

import {AuthContext} from '../services/context/auth'

import {Card,Icon,Label,Image,Button,Popup} from 'semantic-ui-react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

import moment from 'moment'

function PostCard({post: {body,createdAt,id,username,likeCount,commentCount,likes}}) {
  const {user} = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
        />
        <Card.Header as={Link} to={`/user/${username}`}>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id,likes,likeCount}}/>

      <Popup content="Comment on this post 📝!" inverted trigger={
      <Button labelPosition='right' as={Link} to={`/post/${id}`}>
        <Button color='violet' basic>
          <Icon name='comments' />
        </Button>
        <Label as='a' basic color='violet' pointing='left'>
          {commentCount}
        </Label>
      </Button>
      }/>

      {user && user.username === username && <DeleteButton postId={id}/>}
      </Card.Content>
    </Card>
  )
}

export default PostCard
