export const stripHtmlTags = (html: string): string => {
  const strippedText = html.replace(/(<([^>]+)>)/gi, '')
  return strippedText
}
