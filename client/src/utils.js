// ==============================
//
export function dateStartFromToday(offset) {
  const oneDay = 24 * 60 * 60 * 1000
  const t = new Date(Date.now() + oneDay * offset)
  return toString(t).split('T')[0]
}

// ==============================
// convert local [2017-04-15, 23:50:00]
// to UTC ISO: '2017-04-15T15:50:00Z'
export function combineDateTimeToISO(date, time) {
  return new Date(date + ' ' + time).toISOString().split('.')[0] + "Z"
}

// ==============================
// reverse of combineDateTimeToISO
// convert '2017-04-15T15:50:00Z'
// to local: ['2017-04-15', '23:50:00']
export function splitISOToDateTime(iso){
  const x = toString(new Date(iso)).split('T')
  return [x[0], x[1]]
}

// ==============================
// private
// parameter should be a Date Object
function toString(dateObj) {
  return `\
${dateObj.getFullYear()}-\
${leadingZero(dateObj.getMonth() + 1)}-\
${leadingZero(dateObj.getDate())}T\
${leadingZero(dateObj.getHours())}:\
${leadingZero(dateObj.getMinutes())}:\
${leadingZero(dateObj.getSeconds())}\
`
}

// ==============================
// private
// convert '1' to '01'.
// number with double digits won't change
function leadingZero(n) {
  return ('0' + n).slice(-2)
}