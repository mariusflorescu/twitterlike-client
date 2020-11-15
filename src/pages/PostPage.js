import React,{useState,useContext} from 'react'

import {FETCH_POST_QUERY} from '../services/graphql/queries'
import {SUBMIT_COMMENT_MUTATION} from '../services/graphql/mutations'
import {useQuery,useMutation} from '@apollo/client'

import {AuthContext} from '../services/context/auth'

import { Card, Grid,Image,Button,Label,Icon,Form} from 'semantic-ui-react';
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
 
import moment from 'moment'

function PostPage(props) {
  const postId = props.match.params.postId;
  const {user} = useContext(AuthContext);
  
  const [comment,setComment] = useState('');

  const {data={}} = useQuery(FETCH_POST_QUERY,{
    variables: {
      postId
    }
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
    update(){
      setComment('');
    },
    variables:{
      postId,
      body: comment
    }
  })

  const thisPost = data.getPost;

  function deletePostCallback(){
    props.history.push('/');
  }

  let postMarkup;
  if(!thisPost){
    postMarkup = <p>Loading post...</p>
  } else {
    const {id,body,createdAt,username,comments,likes,likeCount,commentCount} = thisPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
          <Image 
            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
            size="small"
            float="right"/>
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>

              <hr/>

              <Card.Content extra>
                <LikeButton user={user} post={{id,likeCount,likes}}/>
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')}>
                  <Button basic color="purple">
                    <Icon name="comments"/>
                  </Button>
                  <Label basic color="violet" pointing="left">{commentCount}</Label>
                </Button>
                {user && user.username===username && (
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
                </Card.Content>
            </Card>
            {user && <Card fluid>
              <Card.Content>
              <p>Post a new comment!</p>
                <Form>
                  <div className="ui action input fluid">
                    <input type="text" placeholder="Comment..." name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type="submit" className="ui button purple" disabled={comment.trim() === ''} onClick={submitComment}>Submit</button>
                  </div>
                </Form>
              </Card.Content>
              </Card>}
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id}/>
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup;
}


export default PostPage
