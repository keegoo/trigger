import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'

const data = [
  {name: 'Page A', uv: 4000, pv: 2400},
  {name: 'Page B', uv: 3000, pv: 1398},
  {name: 'Page C', uv: 2000, pv: 9800},
  {name: 'Page D', uv: 2780, pv: 3908},
  {name: 'Page E', uv: 1890, pv: 4800},
  {name: 'Page F', uv: 2390, pv: 3800},
  {name: 'Page G', uv: 3490, pv: 4300},
]

class Chart extends React.Component {
  render() {
    return(
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <Legend />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    )
  }
}

export default Chart