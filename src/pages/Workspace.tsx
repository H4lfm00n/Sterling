import React, { useState, useEffect } from 'react'

import { 
  Edit3, 
  Eye, 
  Split, 
  BarChart3, 
  Maximize2, 
  Minimize2,
  Save,
  Download,
  Share2
} from 'lucide-react'
import { useNotes } from '../contexts/NoteContext'
// import { useTheme } from '../contexts/ThemeContext'
import { ViewMode } from '../types'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import GraphView from '../components/GraphView'
import WelcomeNote from '../components/WelcomeNote'

const Workspace: React.FC = () => {
  const { state, createNote, getNoteById } = useNotes()
  // const { settings } = useTheme()
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const selectedNote = selectedNoteId ? getNoteById(selectedNoteId) : null

  // Create a welcome note if no notes exist
  useEffect(() => {
    if (Object.keys(state.notes).length === 0) {
      const welcomeNoteId = createNote({
        title: 'Welcome to Sterling',
        content: `# Welcome to Sterling! 🎉

Sterling is your personal idea mapping and planning app, inspired by Obsidian. Here's what you can do:

## ✨ Features

- **Note Taking**: Create and edit notes with Markdown support
- **Linking**: Connect notes together with internal links
- **Tags**: Organize your notes with tags
- **Graph View**: Visualize your knowledge network
- **Search**: Find notes quickly with powerful search

## 🚀 Getting Started

1. **Create a new note** using the + button in the sidebar
2. **Link notes** by typing \`[[note title]]\` in your content
3. **Add tags** by typing \`#tag\` in your content
4. **Switch views** using the view mode buttons above

## 📝 Markdown Support

Sterling supports full Markdown syntax:

- **Bold** and *italic* text
- \`\`\`code blocks\`\`\`
- [Links](https://example.com)
- ![Images](image-url)
- Lists and tables
- And much more!

## 🔗 Linking Notes

Create internal links by wrapping text in double brackets:
- \`[[Another Note]]\` - links to a note titled "Another Note"
- \`[[Note Title|Display Text]]\` - links with custom display text

Start exploring and building your knowledge network!`,
      })
      setSelectedNoteId(welcomeNoteId)
    }
  }, [state.notes, createNote])

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderContent = () => {
    if (!selectedNote) {
      return <WelcomeNote onCreateNote={() => {
        const noteId = createNote({ title: 'Untitled Note', content: '' })
        setSelectedNoteId(noteId)
      }} />
    }

    switch (viewMode) {
      case 'editor':
        return (
          <div className="h-full">
            <Editor
              note={selectedNote}
              onUpdate={(_updates) => {
                // Handle note updates
              }}
            />
          </div>
        )
      
      case 'preview':
        return (
          <div className="h-full">
            <Preview note={selectedNote} />
          </div>
        )
      
      case 'split':
        return (
          <div className="h-full flex">
            <div className="w-1/2 h-full">
              <Editor
                note={selectedNote}
                onUpdate={(_updates) => {
                  // Handle note updates
                }}
              />
            </div>
            <div className="w-1/2 h-full">
              <Preview note={selectedNote} />
            </div>
          </div>
        )
      
      case 'graph':
        return (
          <div className="h-full">
            <GraphView />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Toolbar */}
      <div className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* View Mode Buttons */}
          <div className="flex items-center space-x-1 bg-secondary-100 dark:bg-secondary-700 rounded-lg p-1">
            <button
              onClick={() => handleViewModeChange('editor')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'editor'
                  ? 'bg-white dark:bg-secondary-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`}
              title="Editor"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleViewModeChange('preview')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-secondary-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`}
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleViewModeChange('split')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-secondary-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`}
              title="Split View"
            >
              <Split className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleViewModeChange('graph')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'graph'
                  ? 'bg-white dark:bg-secondary-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`}
              title="Graph View"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
            <Save className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
          
          <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
            <Download className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
          
          <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
            <Share2 className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  )
}

export default Workspace
