// const date = new Date('2022-03-24T12:34:56Z')
// const formattedDate = formatDate(date, 'YYYY/MM/DD HH:mm:ss')
// console.log(formattedDate) // "2022/03/24 12:34:56"が出力される

export const formatDate = (date: Date, format: string) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  format = format.replace('YYYY', year.toString())
  format = format.replace('MM', ('0' + month).slice(-2))
  format = format.replace('DD', ('0' + day).slice(-2))
  format = format.replace('HH', ('0' + hour).slice(-2))
  format = format.replace('mm', ('0' + minute).slice(-2))
  format = format.replace('ss', ('0' + second).slice(-2))

  return format
}
