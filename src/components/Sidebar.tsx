import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Tag, 
  Link, 
  BarChart3, 
  // FolderOpen, 
  ChevronDown, 
  ChevronRight,
  Plus,
  MoreVertical,
  Star,
  // Archive,
  // Trash2
} from 'lucide-react'
import { useNotes } from '../contexts/NoteContext'
import { Note } from '../types'

const Sidebar: React.FC = () => {
  const { state, createNote } = useNotes()
  const [activeTab, setActiveTab] = useState<'files' | 'tags' | 'links' | 'graph'>('files')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const notes = Object.values(state.notes)
  const tags = Object.values(state.tags)

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleCreateNote = () => {
    const noteId = createNote({
      title: 'Untitled Note',
      content: '',
    })
    setSelectedNoteId(noteId)
  }

  const getNotesByFolder = () => {
    const folders: Record<string, Note[]> = {
      'Pinned': notes.filter(note => note.metadata.isPinned),
      'Recent': notes
        .filter(note => !note.metadata.isPinned && !note.metadata.isArchived)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10),
      'Archived': notes.filter(note => note.metadata.isArchived),
    }
    return folders
  }

  const renderFileExplorer = () => {
    const folders = getNotesByFolder()
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Files
          </h3>
          <button
            onClick={handleCreateNote}
            className="p-1 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>
        
        {Object.entries(folders).map(([folderName, folderNotes]) => (
          <div key={folderName} className="space-y-1">
            <button
              onClick={() => toggleFolder(folderName)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded transition-colors"
            >
              <div className="flex items-center space-x-2">
                {expandedFolders.has(folderName) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{folderName}</span>
                <span className="text-xs text-secondary-500">({folderNotes.length})</span>
              </div>
            </button>
            
            <AnimatePresence>
              {expandedFolders.has(folderName) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 pl-6">
                    {folderNotes.map(note => (
                      <button
                        key={note.id}
                        onClick={() => setSelectedNoteId(note.id)}
                        className={`w-full flex items-center justify-between px-2 py-1 text-sm rounded transition-colors ${
                          selectedNoteId === note.id
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{note.title}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {note.metadata.isPinned && (
                            <Star className="w-3 h-3 text-yellow-500" />
                          )}
                          <button className="p-1 rounded hover:bg-secondary-200 dark:hover:bg-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    )
  }

  const renderTags = () => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Tags
          </h3>
          <button className="p-1 rounded hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors">
            <Plus className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>
        
        <div className="space-y-1">
          {tags.map(tag => (
            <button
              key={tag.id}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.name}</span>
                <span className="text-xs text-secondary-500">({tag.count})</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderLinks = () => {
    return (
      <div className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Links
          </h3>
        </div>
        
        <div className="px-3 py-2 text-sm text-secondary-500">
          <p>Link visualization coming soon...</p>
        </div>
      </div>
    )
  }

  const renderGraph = () => {
    return (
      <div className="space-y-2">
        <div className="px-3 py-2">
          <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Graph View
          </h3>
        </div>
        
        <div className="px-3 py-2 text-sm text-secondary-500">
          <p>Graph visualization coming soon...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'tags', label: 'Tags', icon: Tag },
    { id: 'links', label: 'Links', icon: Link },
    { id: 'graph', label: 'Graph', icon: BarChart3 },
  ] as const

  return (
    <div className="h-full flex flex-col bg-secondary-50 dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700">
      {/* Tab Navigation */}
      <div className="flex border-b border-secondary-200 dark:border-secondary-700">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === 'files' && renderFileExplorer()}
        {activeTab === 'tags' && renderTags()}
        {activeTab === 'links' && renderLinks()}
        {activeTab === 'graph' && renderGraph()}
      </div>
    </div>
  )
}

export default Sidebar
