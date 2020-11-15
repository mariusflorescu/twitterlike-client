import React,{useState} from 'react'

import {DELETE_COMMENT_MUTATION,DELETE_POST_MUTATION} from '../services/graphql/mutations'
import {useMutation} from '@apollo/client'

import {Button,Icon,Confirm,Popup} from 'semantic-ui-react'

import {FETCH_POSTS_QUERY} from '../services/graphql/queries'

function DeleteButton({postId,commentId}){
  const [confirmOpen,setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
  const whichDelete = commentId ? 'comment' : 'post'

  const [deletePostOrComment] = useMutation(mutation,{
    update(proxy){
      setConfirmOpen(false);
      if(!commentId){
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        let newData = data.getPosts;
        newData = newData.filter(post => post.id !== postId);
        proxy.writeQuery({query: FETCH_POSTS_QUERY, newData});
      }
    },
    variables:{
      postId,
      commentId
    }
  })

  return(
    <div>
      <Popup content={`Delete this ${whichDelete} 😞!`} inverted trigger={
      <Button as='div' color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{margin:0}}/>
      </Button> }/>
      <Confirm
        open={confirmOpen}
        header="Confirmation needed..."
        content={`Are you sure that you want to delete your ${whichDelete} 🤔?`}
        cancelButton="Cancel"
        confirmButton="Yes, I'm sure 😞"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
        />
    </div>
  )
}





export default DeleteButton