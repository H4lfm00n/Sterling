import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Note } from '../types'
import { useNotes } from '../contexts/NoteContext'
import { useTheme } from '../contexts/ThemeContext'

interface EditorProps {
  note: Note
  onUpdate: (updates: Partial<Note>) => void
}

const Editor: React.FC<EditorProps> = ({ note, onUpdate }) => {
  const [content, setContent] = useState(note.content)
  const [title, setTitle] = useState(note.title)
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const { updateNote } = useNotes()
  const { settings } = useTheme()

  useEffect(() => {
    setContent(note.content)
    setTitle(note.title)
  }, [note.id, note.content, note.title])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    
    // Auto-save if enabled
    if (settings.autoSave) {
      updateNote(note.id, { content: newContent })
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    
    if (settings.autoSave) {
      updateNote(note.id, { title: newTitle })
    }
  }

  const handleTitleBlur = () => {
    setIsEditing(false)
    if (title !== note.title) {
      updateNote(note.id, { title })
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      textareaRef.current?.focus()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setTitle(note.title)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab key handling
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      const newContent = content.substring(0, start) + '  ' + content.substring(end)
      setContent(newContent)
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newContent = content.substring(0, start) + text + content.substring(end)
    
    setContent(newContent)
    updateNote(note.id, { content: newContent })
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length
      textarea.focus()
    }, 0)
  }

  const formatText = (format: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let formattedText = ''
    let cursorOffset = 0
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        cursorOffset = 2
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        cursorOffset = 1
        break
      case 'code':
        formattedText = `\`${selectedText}\``
        cursorOffset = 1
        break
      case 'link':
        formattedText = `[${selectedText}](url)`
        cursorOffset = -3
        break
      case 'image':
        formattedText = `![${selectedText}](image-url)`
        cursorOffset = -8
        break
      case 'list':
        formattedText = `- ${selectedText}`
        cursorOffset = 2
        break
      case 'numbered-list':
        formattedText = `1. ${selectedText}`
        cursorOffset = 3
        break
      case 'quote':
        formattedText = `> ${selectedText}`
        cursorOffset = 2
        break
      case 'code-block':
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``
        cursorOffset = 4
        break
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
    updateNote(note.id, { content: newContent })
    
    setTimeout(() => {
      textarea.selectionStart = start + formattedText.length + cursorOffset
      textarea.selectionEnd = start + formattedText.length + cursorOffset
      textarea.focus()
    }, 0)
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-secondary-900">
      {/* Editor Toolbar */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 py-2 flex items-center space-x-2">
        <button
          onClick={() => formatText('bold')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        
        <button
          onClick={() => formatText('italic')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        
        <button
          onClick={() => formatText('code')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Inline Code"
        >
          <code className="text-sm">`</code>
        </button>
        
        <div className="w-px h-6 bg-secondary-300 dark:bg-secondary-600" />
        
        <button
          onClick={() => formatText('link')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Link"
        >
          🔗
        </button>
        
        <button
          onClick={() => formatText('image')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Image"
        >
          🖼️
        </button>
        
        <div className="w-px h-6 bg-secondary-300 dark:bg-secondary-600" />
        
        <button
          onClick={() => formatText('list')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Bullet List"
        >
          •
        </button>
        
        <button
          onClick={() => formatText('numbered-list')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Numbered List"
        >
          1.
        </button>
        
        <button
          onClick={() => formatText('quote')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Quote"
        >
          "
        </button>
        
        <button
          onClick={() => formatText('code-block')}
          className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          title="Code Block"
        >
          <code className="text-sm">{'{}'}</code>
        </button>
      </div>

      {/* Title Input */}
      <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
        {isEditing ? (
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="w-full text-2xl font-bold bg-transparent border-none outline-none text-secondary-900 dark:text-white placeholder-secondary-500"
            placeholder="Note title..."
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full text-left text-2xl font-bold text-secondary-900 dark:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800 px-2 py-1 rounded transition-colors"
          >
            {title || 'Untitled Note'}
          </button>
        )}
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-6 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white placeholder-secondary-500 resize-none outline-none border-none font-mono"
          style={{
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily === 'Inter' ? 'Inter, sans-serif' : 'JetBrains Mono, monospace',
            lineHeight: '1.6',
          }}
          placeholder="Start writing your note here...
          
Use Markdown syntax for formatting:
- **bold** and *italic* text
- # Headers
- [Links](url)
- ![Images](url)
- `code` and ```code blocks```
- Lists and tables
- [[Internal links]] to other notes"
          spellCheck={settings.spellCheck}
          wrap={settings.wordWrap ? 'soft' : 'off'}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 px-4 py-2 flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400">
        <div className="flex items-center space-x-4">
          <span>Words: {content.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>Characters: {content.length}</span>
          <span>Lines: {content.split('\n').length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{settings.fontFamily}</span>
          <span>{settings.fontSize}px</span>
        </div>
      </div>
    </div>
  )
}

export default Editor
