import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
 {
   getPosts{
     id body createdAt username likeCount
     likes{
       username
     }
     commentCount
     comments{
       id username createdAt body
     }
   }
 }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id body createdAt username likeCount
      likes{
        username
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($username: String!){
    getUserByUsername(username: $username){
      id username email createdAt biography
    }
  }
`;

export const FETCH_USERPOSTS_QUERY = gql`
  query($username: String!){
    getUserPosts(username: $username){
      id body createdAt username likeCount
     likes{
       username
     }
     commentCount
     comments{
       id username createdAt body
    }
  }
  }`;