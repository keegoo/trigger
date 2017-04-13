// ==============================
//
export function dateStartFromToday(offset) {
  const oneDay = 24 * 60 * 60 * 1000
  const t = new Date(Date.now() + oneDay * offset)
  return `${t.getFullYear()}-${("0" + (t.getMonth() + 1)).slice(-2)}-${t.getDate()}`
}

// ==============================
// convert local [2017-04-15, 23:50]
// to UTC ISO: '2017-04-15T15:50:00Z'
export function combineDateHourMinToISO(date, hourmin) {
  const dt = date + ' ' + hourmin + ':00'
  return new Date(dt).toISOString().split('.')[0] + "Z"
}

// ==============================
// reverse of combineDateHourMinToISO
// convert '2017-04-15T15:50:00Z'
// to local: [2017-04-15, 23:50]
export function splitISOToDateHourMin(iso){
  const t = new Date(iso)
  const date = `${t.getFullYear()}-${("0" + (t.getMonth() + 1)).slice(-2)}-${t.getDate()}`
  const hourmin = `${t.getHours()}:${t.getMinutes()}`
  return [date, hourmin]
}