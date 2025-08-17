export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  parentId?: string
  children: string[]
  links: string[]
  metadata: NoteMetadata
}

export interface NoteMetadata {
  wordCount: number
  readingTime: number
  lastOpened?: Date
  isPinned: boolean
  isArchived: boolean
  color?: string
}

export interface Tag {
  id: string
  name: string
  color: string
  count: number
}

export interface Link {
  sourceId: string
  targetId: string
  type: 'internal' | 'external'
  label?: string
}

export interface Workspace {
  id: string
  name: string
  notes: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SearchResult {
  note: Note
  matches: SearchMatch[]
  score: number
}

export interface SearchMatch {
  field: 'title' | 'content' | 'tags'
  text: string
  start: number
  end: number
}

export interface GraphNode {
  id: string
  label: string
  type: 'note' | 'tag'
  size: number
  color: string
  x?: number
  y?: number
}

export interface GraphEdge {
  source: string
  target: string
  type: 'link' | 'tag'
  weight: number
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  accentColor: string
}

export interface AppSettings {
  theme: Theme
  autoSave: boolean
  spellCheck: boolean
  wordWrap: boolean
  fontSize: number
  fontFamily: string
  sidebarWidth: number
  showLineNumbers: boolean
  showMinimap: boolean
}

export type ViewMode = 'editor' | 'preview' | 'split' | 'graph'

export interface EditorState {
  selectedNoteId?: string
  viewMode: ViewMode
  isFullscreen: boolean
  showSidebar: boolean
  showFileExplorer: boolean
  showOutline: boolean
  showBacklinks: boolean
}
