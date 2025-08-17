import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  Settings, 
  Plus, 
  Moon, 
  Sun, 
  Monitor,
  Bell,
  User,
  HelpCircle
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNotes } from '../contexts/NoteContext'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { searchNotes } = useNotes()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      searchNotes(query)
    }
  }

  const getThemeIcon = () => {
    switch (theme.mode) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Sterling
          </h1>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <motion.div
          initial={false}
          animate={{ width: showSearch ? '100%' : 'auto' }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search notes, tags, or content..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              className="w-full pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-secondary-900 dark:text-white placeholder-secondary-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Quick Actions */}
        <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
          <Plus className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
        
        <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
          <Bell className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
        
        <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
          <HelpCircle className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
          title={`Current theme: ${theme.mode}`}
        >
          {getThemeIcon()}
        </button>
        
        {/* Settings */}
        <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
          <Settings className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
        
        {/* User Profile */}
        <button className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">
          <User className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
      </div>
    </header>
  )
}

export default Header
