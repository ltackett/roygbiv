import React from 'react'
import { signIn } from 'store/actions/authActions'

import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'
import styled from 'styled-components'

const SignedOutContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem auto;


  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  main {
    position: relative;
  }
`

const Error = styled.p`
  color: #900;
`

class SignedOut extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidUpdate() {
    const { currentUser } = this.props

    if (currentUser && currentUser.uid) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS' })
    }
  }

  handleSignIn = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.dispatch(signIn({ email, password }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { auth, currentUser } = this.props
    if (currentUser && !currentUser.isEmpty) return <div>Loading</div>

    return (
      <SignedOutContainer>
        <Grid columns={2}>
          <Grid.Column>
            Roygbiv.
          </Grid.Column>

          <Grid.Column textAlign="right">
            <Modal trigger={<Button>Sign In</Button>} closeIcon>
              <Header icon='user' content='Sign In' />
              <Modal.Content>
                {auth.error &&
                  <React.Fragment>
                    <h5>Login Error:</h5>
                    <Error>{auth.error.message}</Error>
                  </React.Fragment>
                }

                <Form onSubmit={this.handleSignIn}>
                  <Form.Field>
                    <Form.Input autoFocus type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                  </Form.Field>

                  <input type="submit" style={{ visibility: 'hidden', position: 'absolute' }} />
                </Form>
              </Modal.Content>

              <Modal.Actions>
                <Button color='green' onClick={this.handleSignIn} loading={auth.loading}>
                  <Icon name='checkmark' /> Sign In
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>

        <main>
          {this.props.children}
        </main>
      </SignedOutContainer>
    )
  }
}

export default SignedOut
