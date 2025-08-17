import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Note, Tag, Link, Workspace, SearchResult, SearchMatch } from '../types'

interface NoteState {
  notes: Record<string, Note>
  tags: Record<string, Tag>
  links: Link[]
  workspaces: Record<string, Workspace>
  currentWorkspaceId: string
  searchResults: SearchResult[]
  isLoading: boolean
}

type NoteAction =
  | { type: 'CREATE_NOTE'; payload: Partial<Note> }
  | { type: 'UPDATE_NOTE'; payload: { id: string; updates: Partial<Note> } }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'CREATE_TAG'; payload: Tag }
  | { type: 'UPDATE_TAG'; payload: { id: string; updates: Partial<Tag> } }
  | { type: 'DELETE_TAG'; payload: string }
  | { type: 'CREATE_LINK'; payload: Link }
  | { type: 'DELETE_LINK'; payload: { sourceId: string; targetId: string } }
  | { type: 'CREATE_WORKSPACE'; payload: Workspace }
  | { type: 'SET_CURRENT_WORKSPACE'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: SearchResult[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: { notes: Record<string, Note>; tags: Record<string, Tag>; links: Link[]; workspaces: Record<string, Workspace> } }

const initialState: NoteState = {
  notes: {},
  tags: {},
  links: [],
  workspaces: {},
  currentWorkspaceId: '',
  searchResults: [],
  isLoading: false,
}

const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case 'CREATE_NOTE': {
      const newNote: Note = {
        id: uuidv4(),
        title: action.payload.title || 'Untitled Note',
        content: action.payload.content || '',
        tags: action.payload.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        parentId: action.payload.parentId,
        children: [],
        links: [],
        metadata: {
          wordCount: 0,
          readingTime: 0,
          isPinned: false,
          isArchived: false,
          ...action.payload.metadata,
        },
      }
      
      return {
        ...state,
        notes: { ...state.notes, [newNote.id]: newNote },
      }
    }
    
    case 'UPDATE_NOTE': {
      const note = state.notes[action.payload.id]
      if (!note) return state
      
      const updatedNote = {
        ...note,
        ...action.payload.updates,
        updatedAt: new Date(),
      }
      
      return {
        ...state,
        notes: { ...state.notes, [action.payload.id]: updatedNote },
      }
    }
    
    case 'DELETE_NOTE': {
      const { [action.payload]: deletedNote, ...remainingNotes } = state.notes
      return {
        ...state,
        notes: remainingNotes,
      }
    }
    
    case 'CREATE_TAG': {
      return {
        ...state,
        tags: { ...state.tags, [action.payload.id]: action.payload },
      }
    }
    
    case 'UPDATE_TAG': {
      const tag = state.tags[action.payload.id]
      if (!tag) return state
      
      const updatedTag = { ...tag, ...action.payload.updates }
      return {
        ...state,
        tags: { ...state.tags, [action.payload.id]: updatedTag },
      }
    }
    
    case 'DELETE_TAG': {
      const { [action.payload]: deletedTag, ...remainingTags } = state.tags
      return {
        ...state,
        tags: remainingTags,
      }
    }
    
    case 'CREATE_LINK': {
      return {
        ...state,
        links: [...state.links, action.payload],
      }
    }
    
    case 'DELETE_LINK': {
      return {
        ...state,
        links: state.links.filter(
          link => !(link.sourceId === action.payload.sourceId && link.targetId === action.payload.targetId)
        ),
      }
    }
    
    case 'CREATE_WORKSPACE': {
      return {
        ...state,
        workspaces: { ...state.workspaces, [action.payload.id]: action.payload },
      }
    }
    
    case 'SET_CURRENT_WORKSPACE': {
      return {
        ...state,
        currentWorkspaceId: action.payload,
      }
    }
    
    case 'SET_SEARCH_RESULTS': {
      return {
        ...state,
        searchResults: action.payload,
      }
    }
    
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    
    case 'LOAD_DATA': {
      return {
        ...state,
        notes: action.payload.notes,
        tags: action.payload.tags,
        links: action.payload.links,
        workspaces: action.payload.workspaces,
      }
    }
    
    default:
      return state
  }
}

interface NoteContextType {
  state: NoteState
  dispatch: React.Dispatch<NoteAction>
  createNote: (noteData: Partial<Note>) => string
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  createTag: (name: string, color: string) => string
  updateTag: (id: string, updates: Partial<Tag>) => void
  deleteTag: (id: string) => void
  createLink: (sourceId: string, targetId: string, type: 'internal' | 'external', label?: string) => void
  deleteLink: (sourceId: string, targetId: string) => void
  searchNotes: (query: string) => SearchResult[]
  getNoteById: (id: string) => Note | undefined
  getNotesByTag: (tagId: string) => Note[]
  getLinkedNotes: (noteId: string) => Note[]
  getBacklinks: (noteId: string) => Note[]
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export const useNotes = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider')
  }
  return context
}

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedNotes = localStorage.getItem('sterling-notes')
        const savedTags = localStorage.getItem('sterling-tags')
        const savedLinks = localStorage.getItem('sterling-links')
        const savedWorkspaces = localStorage.getItem('sterling-workspaces')
        
        if (savedNotes) {
          const notes = JSON.parse(savedNotes)
          // Convert date strings back to Date objects
          Object.keys(notes).forEach(id => {
            notes[id].createdAt = new Date(notes[id].createdAt)
            notes[id].updatedAt = new Date(notes[id].updatedAt)
            if (notes[id].metadata.lastOpened) {
              notes[id].metadata.lastOpened = new Date(notes[id].metadata.lastOpened)
            }
          })
          
          dispatch({
            type: 'LOAD_DATA',
            payload: {
              notes,
              tags: savedTags ? JSON.parse(savedTags) : {},
              links: savedLinks ? JSON.parse(savedLinks) : [],
              workspaces: savedWorkspaces ? JSON.parse(savedWorkspaces) : {},
            },
          })
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      }
    }
    
    loadData()
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem('sterling-notes', JSON.stringify(state.notes))
        localStorage.setItem('sterling-tags', JSON.stringify(state.tags))
        localStorage.setItem('sterling-links', JSON.stringify(state.links))
        localStorage.setItem('sterling-workspaces', JSON.stringify(state.workspaces))
      } catch (error) {
        console.error('Error saving data to localStorage:', error)
      }
    }
    
    saveData()
  }, [state.notes, state.tags, state.links, state.workspaces])

  const createNote = (noteData: Partial<Note>): string => {
    const noteId = uuidv4()
    dispatch({ type: 'CREATE_NOTE', payload: { ...noteData, id: noteId } })
    return noteId
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id, updates } })
  }

  const deleteNote = (id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: id })
  }

  const createTag = (name: string, color: string): string => {
    const tagId = uuidv4()
    const tag: Tag = {
      id: tagId,
      name,
      color,
      count: 0,
    }
    dispatch({ type: 'CREATE_TAG', payload: tag })
    return tagId
  }

  const updateTag = (id: string, updates: Partial<Tag>) => {
    dispatch({ type: 'UPDATE_TAG', payload: { id, updates } })
  }

  const deleteTag = (id: string) => {
    dispatch({ type: 'DELETE_TAG', payload: id })
  }

  const createLink = (sourceId: string, targetId: string, type: 'internal' | 'external', label?: string) => {
    const link: Link = {
      sourceId,
      targetId,
      type,
      label,
    }
    dispatch({ type: 'CREATE_LINK', payload: link })
  }

  const deleteLink = (sourceId: string, targetId: string) => {
    dispatch({ type: 'DELETE_LINK', payload: { sourceId, targetId } })
  }

  const searchNotes = (query: string): SearchResult[] => {
    if (!query.trim()) return []
    
    const results: SearchResult[] = []
    const queryLower = query.toLowerCase()
    
    Object.values(state.notes).forEach(note => {
      const matches: SearchMatch[] = []
      let score = 0
      
      // Search in title
      if (note.title.toLowerCase().includes(queryLower)) {
        const start = note.title.toLowerCase().indexOf(queryLower)
        matches.push({
          field: 'title',
          text: note.title,
          start,
          end: start + query.length,
        })
        score += 10
      }
      
      // Search in content
      if (note.content.toLowerCase().includes(queryLower)) {
        const start = note.content.toLowerCase().indexOf(queryLower)
        matches.push({
          field: 'content',
          text: note.content.substring(start, start + 100) + '...',
          start,
          end: start + query.length,
        })
        score += 5
      }
      
      // Search in tags
      note.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          matches.push({
            field: 'tags',
            text: tag,
            start: 0,
            end: tag.length,
          })
          score += 3
        }
      })
      
      if (matches.length > 0) {
        results.push({ note, matches, score })
      }
    })
    
    return results.sort((a, b) => b.score - a.score)
  }

  const getNoteById = (id: string): Note | undefined => {
    return state.notes[id]
  }

  const getNotesByTag = (tagId: string): Note[] => {
    return Object.values(state.notes).filter(note => 
      note.tags.includes(tagId)
    )
  }

  const getLinkedNotes = (noteId: string): Note[] => {
    const linkedNoteIds = state.links
      .filter(link => link.sourceId === noteId)
      .map(link => link.targetId)
    
    return linkedNoteIds
      .map(id => state.notes[id])
      .filter(Boolean)
  }

  const getBacklinks = (noteId: string): Note[] => {
    const backlinkIds = state.links
      .filter(link => link.targetId === noteId)
      .map(link => link.sourceId)
    
    return backlinkIds
      .map(id => state.notes[id])
      .filter(Boolean)
  }

  const value: NoteContextType = {
    state,
    dispatch,
    createNote,
    updateNote,
    deleteNote,
    createTag,
    updateTag,
    deleteTag,
    createLink,
    deleteLink,
    searchNotes,
    getNoteById,
    getNotesByTag,
    getLinkedNotes,
    getBacklinks,
  }

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}
