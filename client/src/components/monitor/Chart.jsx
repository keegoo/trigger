import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts'
import { fetchColor } from './colorDistributor.js'
import { grey400, grey500 } from 'material-ui/styles/colors'

const styles = {
  border: {
    margin: '10px 0 10px 0',
    boxShadow: `${grey400} 0px 0px 5px`,
    padding: '10px'
  },
  title: {
    textAlign: 'center',
    fontSize: '12px',
    color: grey500,
    margin: '10px'
  }
}

class Chart extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div style={styles.border} >
        <div style={styles.title}>{this.props.chartTitle}</div>
        <ResponsiveContainer width='100%' aspect={5.0/2.0} >
          <LineChart data={this.props.data}>
            <Line type="monotone" dataKey="v" stroke={ fetchColor(0) } />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="t" tick={<CustomizedXAxisTick/>} />
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