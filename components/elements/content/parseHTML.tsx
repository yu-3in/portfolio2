import parse, { Element } from 'html-react-parser'
import Image from 'next/image'

export type ParsedHTMLProps = { html?: string }

export const ParsedHTML: React.FC<ParsedHTMLProps> = ({ html }) => {
  const content = parse(html ?? '', {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === 'img') {
          const { src, alt, width, height } = domNode.attribs
          return (
            <Image
              src={src}
              height={parseInt(height)}
              width={parseInt(width)}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
              }}
              sizes="(min-width: 768px) 768px, 100vw"
            />
          )
        }
      }
    },
  })

  return <>{content}</>
}
