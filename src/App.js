import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import ChartSelector from 'components/ChartSelector'
import Chart from 'components/Chart'
import Layout from 'components/Layout'



class App extends React.Component {
  state = {
    loaded: false
  }

  componentDidUpdate() {
    const { currentUser, isInitializing } = this.props

    if (currentUser.isLoaded && !isInitializing && !this.state.loaded) {
      this.setState({ loaded: true })
    }
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Layout {...this.props}>
        <Router>
          {this.props.auth.loggedIn ? (
            <Switch>
              <Route exact path="/" render={(routeProps) => <ChartSelector {...routeProps} {...this.props} />} />
              <Route path="/charts/:id" render={(routeProps) => <Chart {...routeProps} {...this.props} />} />
            </Switch>
          ) : (
            <div>Not logged in</div>
          )}
        </Router>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  currentUser: state.firebase.auth,
  isInitializing: state.firebase.isInitializing,
  charts: state.firestore.ordered.charts,
  chartsData: state.firestore.data.charts
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'charts' }
  ])
)(App)
