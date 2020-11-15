import React,{useState} from 'react'

import {FETCH_USER_QUERY} from '../services/graphql/queries'
import {useQuery} from '@apollo/client'

import moment from 'moment'

import {Grid,Card,Image,Icon} from 'semantic-ui-react'

import UserPosts from '../components/UserPosts'

function UserProfile(props) {
  const username = props.match.params.userName;
  const [errors,setErrors] = useState({});

  const {data={}} = useQuery(FETCH_USER_QUERY,{
    variables: {
      username
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    }
  })


  const thisUser = data.getUserByUsername;
  let userMarkup;
  if(!thisUser){
    if(errors);
    userMarkup = <p>Loading user profile...</p>
  } else {
        const {username,email,createdAt,biography} = thisUser;

        userMarkup = (
            <Grid>
              <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={8}>
          <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' wrapped ui={false} />
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined {moment(createdAt).fromNow()}</span>
            </Card.Meta>
            <Card.Description>
              {!biography ? "This user has no biography..." : biography}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            
              <Icon name='mail' />
              {email}
            
          </Card.Content>
        </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8} style={{marginTop: 20}}>
        <UserPosts username={username}/>
        </Grid.Column>
        </Grid.Row>
        </Grid>
        );
      
    }


  return userMarkup;
}



 
export default UserProfile
