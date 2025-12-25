// RichText renderer for Payload CMS content
// This is a basic implementation - you may want to use a proper richText renderer

interface RichTextProps {
  content: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  // If content is a string (HTML), render it directly
  if (typeof content === 'string') {
    return (
      <div
        className={`prose prose-lg max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // If content is an array (Payload richText structure), render it
  if (Array.isArray(content)) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        {content.map((node: any, index: number) => {
          // Basic rendering - you may want to use a proper richText renderer
          if (node.type === 'paragraph') {
            return (
              <p key={index} className="mb-4">
                {node.children?.map((child: any, childIndex: number) => {
                  if (child.bold) {
                    return <strong key={childIndex}>{child.text}</strong>
                  }
                  if (child.italic) {
                    return <em key={childIndex}>{child.text}</em>
                  }
                  return <span key={childIndex}>{child.text}</span>
                })}
              </p>
            )
          }
          if (node.type === 'heading') {
            const HeadingTag = `h${node.depth || 2}` as keyof JSX.IntrinsicElements
            return (
              <HeadingTag key={index} className="mb-4 font-bold">
                {node.children?.map((child: any) => child.text).join('')}
              </HeadingTag>
            )
          }
          return null
        })}
      </div>
    )
  }

  return null
}

