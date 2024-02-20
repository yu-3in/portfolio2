import parse, { DOMNode, Element, domToReact } from 'html-react-parser'
import Image from 'next/image'

export type ParsedHTMLProps = { html?: string }

export const replace = (domNode: DOMNode) => {
  if (domNode instanceof Element && domNode.attribs) {
    switch (domNode.name) {
      // case 'img':
      //   const { src, alt, width, height } = domNode.attribs
      //   return (
      //     <Image
      //       src={src}
      //       height={parseInt(height)}
      //       width={parseInt(width)}
      //       alt={alt}
      //       style={{
      //         width: '100%',
      //         height: 'auto',
      //       }}
      //       sizes="(min-width: 768px) 768px, 100vw"
      //     />
      //   )
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
      case 'ol':
        return (
          <ol {...domNode.attribs} className="ml-4 list-decimal">
            {domToReact(domNode.children, { replace })}
          </ol>
        )
      case 'h1':
        return (
          <h2 {...domNode.attribs} className="mt-6 mb-4 text-2xl font-bold">
            {domToReact(domNode.children)}
          </h2>
        )
      case 'h2':
        return (
          <h3 {...domNode.attribs} className="mt-4 mb-2 text-xl font-bold">
            {domToReact(domNode.children)}
          </h3>
        )
      case 'h3':
        return (
          <h4 {...domNode.attribs} className="my-2 text-lg font-bold">
            {domToReact(domNode.children)}
          </h4>
        )
      case 'h4':
        return (
          <h5 {...domNode.attribs} className="text-md my-2 font-bold">
            {domToReact(domNode.children)}
          </h5>
        )
      case 'h5':
        return (
          <h6 {...domNode.attribs} className="my-2 text-sm font-bold">
            {domToReact(domNode.children)}
          </h6>
        )
      case 'h6':
        return (
          <p {...domNode.attribs} className="my-2 text-sm font-bold">
            {domToReact(domNode.children)}
          </p>
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
