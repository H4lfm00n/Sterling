import React from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText, Link, Tag, BarChart3, Sparkles } from 'lucide-react'

interface WelcomeNoteProps {
  onCreateNote: () => void
}

const WelcomeNote: React.FC<WelcomeNoteProps> = ({ onCreateNote }) => {
  const features = [
    {
      icon: FileText,
      title: 'Note Taking',
      description: 'Create and edit notes with full Markdown support',
    },
    {
      icon: Link,
      title: 'Linking',
      description: 'Connect notes together with internal links',
    },
    {
      icon: Tag,
      title: 'Tags',
      description: 'Organize your notes with tags and categories',
    },
    {
      icon: BarChart3,
      title: 'Graph View',
      description: 'Visualize your knowledge network',
    },
  ]

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 text-center"
      >
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Welcome to Sterling
          </h1>
          
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Your personal idea mapping and planning app, inspired by Obsidian. 
            Start building your knowledge network today.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-secondary-800 rounded-xl p-8 shadow-sm border border-secondary-200 dark:border-secondary-700 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
            Quick Start
          </h2>
          
          <div className="space-y-4 text-left mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold">1</span>
              </div>
              <p className="text-secondary-700 dark:text-secondary-300">
                <strong>Create your first note</strong> by clicking the button below
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold">2</span>
              </div>
              <p className="text-secondary-700 dark:text-secondary-300">
                <strong>Link notes together</strong> by typing <code className="bg-secondary-100 dark:bg-secondary-700 px-1 py-0.5 rounded text-sm">[[note title]]</code> in your content
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold">3</span>
              </div>
              <p className="text-secondary-700 dark:text-secondary-300">
                <strong>Add tags</strong> by typing <code className="bg-secondary-100 dark:bg-secondary-700 px-1 py-0.5 rounded text-sm">#tag</code> in your content
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold">4</span>
              </div>
              <p className="text-secondary-700 dark:text-secondary-300">
                <strong>Explore different views</strong> using the view mode buttons in the toolbar
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateNote}
            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Note</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-secondary-500 dark:text-secondary-400"
        >
          <p className="text-sm">
            Sterling is designed to help you think, plan, and organize your ideas effectively.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WelcomeNote
