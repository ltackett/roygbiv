import React from 'react'
import { connect } from 'react-redux'
import { signIn } from 'store/actions/authActions'

import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
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

  componentDidMount() {
    if (this.props.firebase.auth().currentUser) {
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
    const { auth } = this.props

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
                    <Form.Input autoFocus name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
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

export default connect()(SignedOut)
