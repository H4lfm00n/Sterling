import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Settings, Plus, FolderOpen, FileText, Tag, Link, BarChart3 } from 'lucide-react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useTheme } from '../contexts/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { settings } = useTheme()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-secondary-900">
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -settings.sidebarWidth }}
              animate={{ x: 0 }}
              exit={{ x: -settings.sidebarWidth }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="sidebar"
              style={{ width: settings.sidebarWidth }}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-white dark:bg-secondary-900">
            {children}
          </main>
        </div>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Layout
