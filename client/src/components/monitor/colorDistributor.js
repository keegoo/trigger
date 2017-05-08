import { 
  red500,
  pink500,
  purple500,
  deepPurple500,
  indigo500,
  blue500,
  lightBlue500,
  cyan500,
  teal500,
  green500,
  lightGreen500,
  lime500,
  yellow500,
  amber500,
  orange500,
  deepOrange500,
  brown500,
  grey500,
  blueGrey500
 } from 'material-ui/styles/colors'

export function fetchColor(index){
  const colors = [
    red500,
    pink500,
    purple500,
    deepPurple500,
    indigo500,
    blue500,
    lightBlue500,
    cyan500,
    teal500,
    green500,
    lightGreen500,
    lime500,
    yellow500,
    amber500,
    orange500,
    deepOrange500,
    brown500,
    grey500,
    blueGrey500
  ]
  const sum = colors.length
  return colors[index%sum]
}