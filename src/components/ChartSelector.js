import React from 'react'

import { Link } from 'react-router-dom'

const ChartSelector = ({ charts }) => (
  <ul>
    {charts && charts.length && charts.map(chart =>
      <li key={chart.id}>
        <Link to={`/charts/${chart.id}`} key={chart.id}>
          {chart.name}
        </Link>
      </li>
    )}
  </ul>
)


export default ChartSelector
