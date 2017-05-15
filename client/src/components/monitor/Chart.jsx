import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts'
import { fetchColor } from './colorDistributor.js'
import { grey400 } from 'material-ui/styles/colors'

const data = [
  {name: 'Page A', uv: 40, pv: 24},
  {name: 'Page B', uv: 30, pv: 13},
  {name: 'Page C', uv: 20, pv: 98},
  {name: 'Page D', uv: 27, pv: 39},
  {name: 'Page E', uv: 18, pv: 48},
  {name: 'Page F', uv: 23, pv: 38},
  {name: 'Page G', uv: 34, pv: 43},
]

const styles = {
  border: {
    margin: '10px 0 10px 0',
    boxShadow: `${grey400} 0px 0px 10px`,
    padding: '10px'
  },
  title: {
    textAlign: 'center',
    fontSize: '12px',
    color: grey400,
    margin: '10px'
  }
}

class Chart extends React.Component {
  render() {
    return(
      <div style={styles.border} >
        <div style={styles.title}>Hits per Second</div>
        <ResponsiveContainer width='100%' aspect={5.0/2.0} >
          <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke={ fetchColor(0) } />
            <Line type="monotone" dataKey="pv" stroke={ fetchColor(1) } />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" tick={<CustomizedXAxisTick/>} />
            <YAxis tick={<CustomizedYAxisTick/>} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}


class CustomizedXAxisTick extends React.Component {
  render() {
    const {x, y, stroke, payload} = this.props
    return(
      <text x={x} y={y} dy={16} textAnchor="end" fill="#666" fontSize={12} >{payload.value}</text>
    )
  }
}


class CustomizedYAxisTick extends React.Component {
  render() {
    const {x, y, stroke, payload} = this.props
    return(
      <text x={x} y={y} dx={-16} textAnchor="end" fill="#666" fontSize={12} >{payload.value}</text>
    )
  }
}
export default Chart