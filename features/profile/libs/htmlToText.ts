export const htmlToText = (html: string) => {
  let tempDivElement = document.createElement('div')
  tempDivElement.innerHTML = html
  return tempDivElement.textContent || tempDivElement.innerText || ''
}
