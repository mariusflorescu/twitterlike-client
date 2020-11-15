import React,{useState} from 'react'

import {CREATE_POST_MUTATION} from '../services/graphql/mutations'
import {useMutation} from '@apollo/client'

import {FETCH_POSTS_QUERY} from '../services/graphql/queries'

import {useForm} from '../services/Hooks'

import {Form,Button, Card} from 'semantic-ui-react'

export default function PostForm() {
  const [hasErrors,setHasErrors] = useState(false);
  const [errors,setErrors] = useState({});

  const {values,onChange,onSubmit} = useForm(createPostCallback,{
    body: ''
  })

  const [createPost] = useMutation(CREATE_POST_MUTATION,{
    variables: values,
    update(proxy,result){
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      let newData = data.getPosts;
      newData= [result.data.createPost,...newData];
      proxy.writeQuery({query: FETCH_POSTS_QUERY,newData});
      values.body = '';
    },
    refetchQuery: [`getPosts`],
    onError(error){
      if(error.graphQLErrors[0]){
        setErrors(error.graphQLErrors[0].message);
        setHasErrors(true);
      }
    }
  })

  function createPostCallback(){
    createPost();
  }

  return (
    <Card fluid>
      <Card.Content>
        <Form onSubmit={onSubmit}>
          <h2 className="createPost">Create a post:</h2>
          <Form.Field>
            <Form.Input 
              placeholder="Express yourself"
              name="body"
              onChange={onChange}
              value={values.body}
              error={hasErrors ? true : false}
              style={{width: 80 + '%'}}
              />
              
              <Button type="submit" color="violet">Submit</Button>
          </Form.Field>
        </Form>
        {hasErrors && (
                <div className="ui error message" style={{marginTop:5,marginBottom:5}}>
                  <ul className="list">
                    <li>{errors}</li>
                  </ul>
                </div>
        )}
      </Card.Content>
    </Card>
  )
}

