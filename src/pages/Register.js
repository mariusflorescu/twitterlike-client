import React,{useState,useContext} from 'react'

import {REGISTER_USER_MUTATION} from '../services/graphql/mutations'
import {useMutation} from '@apollo/client'

import {AuthContext} from '../services/context/auth'

import {Form,Button} from 'semantic-ui-react'

import {useForm} from '../services/Hooks'

function Register(props) {
  const context = useContext(AuthContext);
  const [errors,setErrors] = useState({});

  const {onChange,onSubmit,values} = useForm(registerUser,{
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser,{loading}] = useMutation(REGISTER_USER_MUTATION,{
    update(_, {data: {register: userData}}){
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function registerUser(){
    addUser();
  }
  

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}/>

      <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}/>

      <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}/>

      <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}/>

        <Button type="submit" color="violet">Register</Button>

        </Form>
        {Object.keys(errors).length>0 && (
          <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
          </div>
        )}
    </div>
  )
}



export default Register
