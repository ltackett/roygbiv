import React from 'react'
import { signOut } from 'store/actions/authActions'
import styled from 'styled-components'

const SignedInContainer = styled.div`
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

const SignedIn = (props) => {
  if (!props.auth) return <div>Loading...</div>

  const { currentUser } = props

  const handleSignOut = (event) => {
    event.preventDefault()
    props.dispatch(signOut())
  }

  return (
    <SignedInContainer>
      <header>
        signed in as {currentUser.email} - <a  href="#sign-out" onClick={handleSignOut}>Sign Out</a>
      </header>
      <main>
        {props.children}
      </main>
    </SignedInContainer>
  )
}

export default SignedIn
