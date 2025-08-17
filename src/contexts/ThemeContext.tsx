import React, { createContext, useContext, useState, useEffect } from 'react'
import { Theme, AppSettings } from '../types'

interface ThemeContextType {
  theme: Theme
  settings: AppSettings
  setTheme: (theme: Partial<Theme>) => void
  setSettings: (settings: Partial<AppSettings>) => void
  toggleTheme: () => void
}

const defaultTheme: Theme = {
  mode: 'system',
  primaryColor: '#0ea5e9',
  accentColor: '#d946ef',
}

const defaultSettings: AppSettings = {
  theme: defaultTheme,
  autoSave: true,
  spellCheck: true,
  wordWrap: true,
  fontSize: 14,
  fontFamily: 'Inter',
  sidebarWidth: 250,
  showLineNumbers: false,
  showMinimap: false,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [settings, setSettingsState] = useState<AppSettings>(defaultSettings)

  // Load theme and settings from localStorage on mount
  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem('sterling-theme')
        const savedSettings = localStorage.getItem('sterling-settings')
        
        if (savedTheme) {
          setThemeState(JSON.parse(savedTheme))
        }
        
        if (savedSettings) {
          setSettingsState(JSON.parse(savedSettings))
        }
      } catch (error) {
        console.error('Error loading theme from localStorage:', error)
      }
    }
    
    loadTheme()
  }, [])

  // Save theme and settings to localStorage whenever they change
  useEffect(() => {
    const saveTheme = () => {
      try {
        localStorage.setItem('sterling-theme', JSON.stringify(theme))
        localStorage.setItem('sterling-settings', JSON.stringify(settings))
      } catch (error) {
        console.error('Error saving theme to localStorage:', error)
      }
    }
    
    saveTheme()
  }, [theme, settings])

  // Apply theme to document
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement
      
      // Set CSS custom properties for colors
      root.style.setProperty('--color-primary', theme.primaryColor)
      root.style.setProperty('--color-accent', theme.accentColor)
      
      // Apply dark/light mode
      if (theme.mode === 'dark' || (theme.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
    
    applyTheme()
  }, [theme])

  const setTheme = (newTheme: Partial<Theme>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }))
  }

  const setSettings = (newSettings: Partial<AppSettings>) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }))
  }

  const toggleTheme = () => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : prev.mode === 'dark' ? 'system' : 'light',
    }))
  }

  const value: ThemeContextType = {
    theme,
    settings,
    setTheme,
    setSettings,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
