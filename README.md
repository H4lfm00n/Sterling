# Sterling - Idea Mapping & Planning App

A modern, web-based idea mapping and planning application inspired by Obsidian. Sterling helps you think, plan, and organize your ideas effectively with a beautiful, intuitive interface.

![Sterling App](https://img.shields.io/badge/Sterling-Idea%20Mapping%20App-blue?style=for-the-badge)

## ✨ Features

### 📝 Note Taking
- **Full Markdown Support**: Write with complete Markdown syntax including tables, code blocks, and more
- **Real-time Preview**: See your formatted content as you type
- **Split View**: Edit and preview simultaneously
- **Auto-save**: Your work is automatically saved as you type

### 🔗 Internal Linking
- **Wiki-style Links**: Connect notes with `[[note title]]` syntax
- **Backlinks**: See which notes link to the current note
- **Graph View**: Visualize your knowledge network with an interactive graph
- **Smart Suggestions**: Auto-complete for note titles

### 🏷️ Organization
- **Tag System**: Organize notes with tags and categories
- **File Explorer**: Browse notes by folders and categories
- **Search**: Powerful search across titles, content, and tags
- **Pinning**: Pin important notes for quick access

### 🎨 Modern Interface
- **Dark/Light Mode**: Switch between themes or use system preference
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Beautiful transitions and interactions
- **Customizable**: Adjust font size, family, and other settings

### 🔒 Privacy & Security
- **Local Storage**: Your data stays on your device
- **No Cloud Required**: Works completely offline
- **Export Options**: Export your notes in various formats

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sterling.git
   cd sterling
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

### Creating Notes
1. Click the "+" button in the sidebar
2. Start typing your note title
3. Write your content using Markdown syntax

### Linking Notes
- Use `[[note title]]` to create internal links
- Use `[[Note Title|Display Text]]` for custom display text
- Click on links in preview mode to navigate

### Adding Tags
- Type `#tag` in your content to add tags
- Tags are automatically detected and organized
- Filter notes by tags in the sidebar

### Using Different Views
- **Editor**: Write and edit your notes
- **Preview**: See the formatted version
- **Split**: Edit and preview side by side
- **Graph**: Visualize note connections

### Keyboard Shortcuts
- `Ctrl/Cmd + S`: Save note
- `Ctrl/Cmd + B`: Bold text
- `Ctrl/Cmd + I`: Italic text
- `Ctrl/Cmd + K`: Create link
- `Tab`: Indent (2 spaces)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Markdown**: React Markdown + rehype plugins
- **Graph Visualization**: D3.js
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
sterling/
├── src/
│   ├── components/          # React components
│   │   ├── Editor.tsx       # Markdown editor
│   │   ├── Preview.tsx      # Markdown preview
│   │   ├── GraphView.tsx    # Graph visualization
│   │   ├── Layout.tsx       # Main layout
│   │   ├── Sidebar.tsx      # Sidebar navigation
│   │   └── Header.tsx       # Top header
│   ├── contexts/            # React contexts
│   │   ├── NoteContext.tsx  # Note management
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/               # Page components
│   │   ├── Workspace.tsx    # Main workspace
│   │   └── Welcome.tsx      # Welcome page
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md               # This file
```

## 🎨 Customization

### Themes
Sterling supports light, dark, and system themes. You can customize colors by modifying the Tailwind configuration.

### Settings
- Font size and family
- Auto-save preferences
- Word wrap settings
- Spell check options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Obsidian](https://obsidian.md/)
- Icons from [Lucide](https://lucide.dev/)
- Markdown processing with [React Markdown](https://github.com/remarkjs/react-markdown)
- Graph visualization with [D3.js](https://d3js.org/)

## 🐛 Known Issues

- Graph view performance with large numbers of notes
- Mobile responsiveness improvements needed
- Export functionality (coming soon)
- Cloud sync (coming soon)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/sterling/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ for the knowledge management community**
