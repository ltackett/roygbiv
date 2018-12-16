import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import ChartSelector from 'components/ChartSelector'
import Chart from 'components/Chart'
import Layout from 'components/Layout'

const App = (props) => {
  if (!props.charts && !props.chartsData) {
    return <div>Loading...</div>
  }

  const sortedCharts = () => {
    const sorted = [...props.charts]
    sorted.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1
      if (nameA > nameB) return 1

      return 0
    })

    return sorted
  }

  const routeProps = {
    charts: sortedCharts(),
    chartsData: props.chartsData,
    firebase: props.firebase,
    firestore: props.firestore,
  }

  return (
    <Layout {...routeProps}>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <ChartSelector {...props} {...routeProps} />} />
          <Route path="/charts/:id" render={(props) => <Chart {...props} {...routeProps} />} />
        </Switch>
      </Router>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  charts: state.firestore.ordered.charts,
  chartsData: state.firestore.data.charts
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'charts' }
  ])
)(App)
