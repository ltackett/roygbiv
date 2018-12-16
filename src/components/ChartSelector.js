import React from 'react'

import { Link } from 'react-router-dom'

const ChartSelector = ({ charts }) => {
  if (!charts && !charts.length) return <div>Loading...</div>

  const sortedCharts = () => {
    const sorted = [...charts]
    sorted.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1
      if (nameA > nameB) return 1

      return 0
    })

    return sorted
  }

  return (
    <ul>
      {sortedCharts().map(chart =>
        <li key={chart.id}>
          <Link to={`/charts/${chart.id}`} key={chart.id}>
            {chart.name}
          </Link>
        </li>
      )}
    </ul>
  )
}


export default ChartSelector
