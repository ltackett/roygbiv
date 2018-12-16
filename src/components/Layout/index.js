import React from 'react';
import { connect } from 'react-redux'

import SignedIn from './SignedIn'
import SignedOut from './SignedOut'


const LayoutSelector = (props) => {
  if (props.auth.loggedIn) {
    return <SignedIn {...props} />
  } else {
    return <SignedOut {...props} />
  }
}

const Layout = (props) => {
  return (
    <LayoutSelector {...props}>
      {props.children}
    </LayoutSelector>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Layout);
