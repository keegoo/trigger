import React from 'react'
import PropTypes from 'prop-types'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import UserIcon from 'material-ui/svg-icons/social/group'
import TrendIcon from 'material-ui/svg-icons/action/trending-up'
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import Divider from 'material-ui/Divider'
import { grey400, grey500, red500, black } from 'material-ui/styles/colors'
import R from 'ramda'

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

const chooseIcon = (style) => {
  return R.cond([
    [R.equals('users'),     R.always(<UserIcon style={style}/>)],
    [R.equals('duration'),  R.always(<TimerIcon style={style}/>)],
    [R.equals('hits'),      R.always(<TrendIcon style={style}/>)],
    [R.equals('errors'),    R.always(<ErrorIcon style={style}/>)],
    [R.T,                   R.always(<HelpIcon style={style}/>)]
  ])
}

const Gauge = (props) => {
  const styles = getStyles(props)
  const chooseIconOnType = chooseIcon(styles.icon)
  return(
    <div style={styles.border}>
      <div style={styles.title}>{props.title}</div>
      <Divider />
      <div style={styles.body}>
        {chooseIconOnType(props.iconType)}
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
  iconType:   PropTypes.oneOf(['users', 'duration', 'hits', 'errors', 'default']),
  unit:       PropTypes.string.isRequired,
  label:      PropTypes.string.isRequired,
  labelColor: PropTypes.string
}

Gauge.defaultProps = {
  title:    'Title',
  iconType: 'default',
  unit:     'Unit.',
  label:    'Label'
}

export default Gauge