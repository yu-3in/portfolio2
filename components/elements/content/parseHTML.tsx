import parse, { DOMNode, Element, domToReact } from 'html-react-parser'
import Image from 'next/image'

export type ParsedHTMLProps = { html?: string }

export const replace = (domNode: DOMNode) => {
  if (domNode instanceof Element && domNode.attribs) {
    switch (domNode.name) {
      case 'img':
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
      case 'a':
        return (
          <a
            {...domNode.attribs}
            className="underline"
            rel="noopener noreferrer"
          >
            {domToReact(domNode.children)}
          </a>
        )
      case 'ul':
        return (
          <ul {...domNode.attribs} className="ml-4 list-disc">
            {domToReact(domNode.children, { replace })}
          </ul>
        )
    }
  }
}

export const ParsedHTML: React.FC<ParsedHTMLProps> = ({ html }) => {
  const content = parse(html ?? '', {
    replace,
  })

  return <>{content}</>
}
