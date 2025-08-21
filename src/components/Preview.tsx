import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Note } from '../types'
// import { useNotes } from '../contexts/NoteContext'

interface PreviewProps {
  note: Note
}

const Preview: React.FC<PreviewProps> = ({ note }) => {
  // const { getNoteById } = useNotes()

  // Custom components for markdown rendering
  const components = {
    // Handle internal links [[note title]]
    a: ({ href, children, ...props }: any) => {
      if (href?.startsWith('[[') && href?.endsWith(']]')) {
        const noteTitle = href.slice(2, -2)
        // const linkedNote = Object.values(getNoteById(noteTitle) || {})
        
        return (
          <button
            className="text-primary-600 hover:text-primary-700 underline bg-primary-50 hover:bg-primary-100 px-1 py-0.5 rounded transition-colors"
            onClick={() => {
              // Handle navigation to linked note
              console.log('Navigate to:', noteTitle)
            }}
            {...props}
          >
            {children}
          </button>
        )
      }
      
      return (
        <a
        
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 underline"
          {...props}
        >
          {children}
        </a>
      )
    },
    
    // Custom heading styles
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4 mt-6 first:mt-0" {...props}>
        {children}
      </h1>
    ),
    
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200 mb-3 mt-5" {...props}>
        {children}
      </h2>
    ),
    
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-medium text-secondary-700 dark:text-secondary-300 mb-2 mt-4" {...props}>
        {children}
      </h3>
    ),
    
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg font-medium text-secondary-700 dark:text-secondary-300 mb-2 mt-3" {...props}>
        {children}
      </h4>
    ),
    
    h5: ({ children, ...props }: any) => (
      <h5 className="text-base font-medium text-secondary-700 dark:text-secondary-300 mb-2 mt-3" {...props}>
        {children}
      </h5>
    ),
    
    h6: ({ children, ...props }: any) => (
      <h6 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 mt-3" {...props}>
        {children}
      </h6>
    ),
    
    // Paragraph styling
    p: ({ children, ...props }: any) => (
      <p className="text-secondary-700 dark:text-secondary-300 mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    
    // List styling
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-secondary-700 dark:text-secondary-300" {...props}>
        {children}
      </ul>
    ),
    
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-secondary-700 dark:text-secondary-300" {...props}>
        {children}
      </ol>
    ),
    
    li: ({ children, ...props }: any) => (
      <li className="text-secondary-700 dark:text-secondary-300" {...props}>
        {children}
      </li>
    ),
    
    // Code styling
    code: ({ inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        )
      }
      
      return (
        <code className="block bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props}>
          {children}
        </code>
      )
    },
    
    // Blockquote styling
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-secondary-600 dark:text-secondary-400 mb-4 bg-primary-50 dark:bg-primary-900/20 py-2" {...props}>
        {children}
      </blockquote>
    ),
    
    // Table styling
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-secondary-200 dark:border-secondary-700 rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    
    thead: ({ children, ...props }: any) => (
      <thead className="bg-secondary-50 dark:bg-secondary-800" {...props}>
        {children}
      </thead>
    ),
    
    th: ({ children, ...props }: any) => (
      <th className="px-4 py-2 text-left font-medium text-secondary-900 dark:text-white border-b border-secondary-200 dark:border-secondary-700" {...props}>
        {children}
      </th>
    ),
    
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-2 text-secondary-700 dark:text-secondary-300 border-b border-secondary-200 dark:border-secondary-700" {...props}>
        {children}
      </td>
    ),
    
    // Horizontal rule
    hr: ({ ...props }: any) => (
      <hr className="border-t border-secondary-200 dark:border-secondary-700 my-6" {...props} />
    ),
    
    // Image styling
    img: ({ src, alt, ...props }: any) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-sm my-4"
        {...props}
      />
    ),
  }

  // Process content to handle internal links
  const processContent = (content: string) => {
    // Convert [[note title]] to markdown links
    return content.replace(/\[\[([^\]]+)\]\]/g, (_match, noteTitle) => {
      return `[${noteTitle}]([[${noteTitle}]])`
    })
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-secondary-900">
      {/* Preview Header */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          {note.title}
        </h1>
        <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-600 dark:text-secondary-400">
          <span>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{note.metadata.wordCount} words</span>
          <span>•</span>
          <span>{Math.ceil(note.metadata.readingTime)} min read</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={components}
            className="markdown-content"
          >
            {processContent(note.content)}
          </ReactMarkdown>
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400">
          <div className="flex items-center space-x-4">
            {note.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <span>Tags:</span>
                {note.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span>Preview Mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
