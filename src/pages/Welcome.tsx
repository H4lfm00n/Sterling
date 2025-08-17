import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  FileText, 
  Link, 
  Tag, 
  BarChart3, 
  Zap, 
  Shield, 
  Cloud,
  ArrowRight,
  Check
} from 'lucide-react'

interface WelcomeProps {
  onComplete: () => void
}

const Welcome: React.FC<WelcomeProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const steps = [
    {
      title: 'Welcome to Sterling',
      subtitle: 'Your personal idea mapping and planning app',
      description: 'Sterling is inspired by Obsidian and designed to help you think, plan, and organize your ideas effectively.',
      icon: Sparkles,
    },
    {
      title: 'Choose Your Features',
      subtitle: 'Customize your experience',
      description: 'Select the features that matter most to your workflow. You can always change these later.',
      icon: Zap,
    },
    {
      title: 'Ready to Start',
      subtitle: 'Your workspace is ready',
      description: 'You\'re all set! Start creating notes and building your knowledge network.',
      icon: Check,
    },
  ]

  const features = [
    {
      id: 'markdown',
      title: 'Markdown Support',
      description: 'Write with full Markdown syntax including tables, code blocks, and more',
      icon: FileText,
    },
    {
      id: 'linking',
      title: 'Internal Linking',
      description: 'Connect notes together with [[internal links]] for better organization',
      icon: Link,
    },
    {
      id: 'tags',
      title: 'Tag System',
      description: 'Organize your notes with tags and categories',
      icon: Tag,
    },
    {
      id: 'graph',
      title: 'Graph View',
      description: 'Visualize your knowledge network with an interactive graph',
      icon: BarChart3,
    },
    {
      id: 'sync',
      title: 'Local Storage',
      description: 'Your data stays on your device for privacy and security',
      icon: Shield,
    },
    {
      id: 'cloud',
      title: 'Cloud Sync',
      description: 'Sync your notes across devices (coming soon)',
      icon: Cloud,
    },
  ]

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {steps[currentStep].title}
            </h1>
            
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
              {steps[currentStep].subtitle}
            </p>
            
            <p className="text-secondary-700 dark:text-secondary-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              {steps[currentStep].description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Note Taking
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                  Create and edit notes with full Markdown support
                </p>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Link className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Linking
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                  Connect notes together with internal links
                </p>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Graph View
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                  Visualize your knowledge network
                </p>
              </div>
            </div>
          </motion.div>
        )
        
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300">
                {steps[currentStep].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {features.map(feature => (
                <motion.button
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedFeatures.includes(feature.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      selectedFeatures.includes(feature.id)
                        ? 'bg-primary-500'
                        : 'bg-secondary-100 dark:bg-secondary-700'
                    }`}>
                      <feature.icon className={`w-5 h-5 ${
                        selectedFeatures.includes(feature.id)
                          ? 'text-white'
                          : 'text-secondary-600 dark:text-secondary-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {feature.description}
                      </p>
                    </div>
                    
                    {selectedFeatures.includes(feature.id) && (
                      <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {steps[currentStep].title}
            </h1>
            
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-4">
              {steps[currentStep].subtitle}
            </p>
            
            <p className="text-secondary-700 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
              {steps[currentStep].description}
            </p>
            
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700 max-w-md mx-auto">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-3">
                Quick Tips:
              </h3>
              <ul className="text-left space-y-2 text-sm text-secondary-600 dark:text-secondary-400">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Use <code className="bg-secondary-100 dark:bg-secondary-700 px-1 py-0.5 rounded">[[note title]]</code> to link notes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Add <code className="bg-secondary-100 dark:bg-secondary-700 px-1 py-0.5 rounded">#tags</code> to organize</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Switch between editor, preview, and graph views</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep
                      ? 'bg-primary-500'
                      : 'bg-secondary-200 dark:bg-secondary-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl border border-secondary-200 dark:border-secondary-700 p-8 md:p-12">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 max-w-md mx-auto">
          <button
            onClick={handleSkip}
            className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-colors"
          >
            Skip
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
