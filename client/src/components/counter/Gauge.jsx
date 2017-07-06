import React from 'react'
import PropTypes from 'prop-types'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import Divider from 'material-ui/Divider'
import { black } from 'material-ui/styles/colors'

import theme from '../styles/theme.js'

const getStyles = (props) => {
  const {spacing, borderRadius, boxShadow, fontSize, palette} = theme

  return {
    border: {
      boxShadow,
      borderRadius
    },
    title: {
      padding: spacing.desktopGutterMini,
      textAlign: 'center',
      color: palette.primary1Color,
      fontSize: fontSize.normal
    },
    body: {
      padding: spacing.desktopGutterMini,
      display: 'flex',
      justifyContent: 'space-between',
      height: '60px'
    },
    icon: {
      color: palette.primary1Color,
      marginTop: '15px'
    },
    textArea: {
      marginTop: '10px'
    },
    unit: {
      fontSize: fontSize.small,
      marginRight: '5px'
    },
    label: {
      fontSize: fontSize.large,
      color: props.labelColor || black
    }
  }
}

const Gauge = (props) => {
  const styles = getStyles(props)
  const TheIcon = props.icon
  return(
    <div style={styles.border}>
      <div style={styles.title}>{props.title}</div>
      <Divider />
      <div style={styles.body}>
        <TheIcon style={styles.icon}/>
        <div style={styles.textArea}>
          <span style={styles.unit}>{props.unit}</span>
          <span style={styles.label}>{props.label}</span>
        </div>
      </div>
    </div>
  )
}

Gauge.propTypes = {
  title:      PropTypes.string.isRequired,
  icon:       PropTypes.func.isRequired,
  unit:       PropTypes.string.isRequired,
  label:      PropTypes.string.isRequired,
  labelColor: PropTypes.string
}

Gauge.defaultProps = {
  title:    'Title',
  icon:     HelpIcon,
  unit:     'Unit.',
  label:    'Label'
}

export default Gauge