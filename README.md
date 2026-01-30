# Monaco Editor Test Application

A professional React-based Monaco Editor playground with comprehensive configuration options and Search Workbench capabilities.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

## 🎯 Key Features

### Monaco Editor Playground
- **55+ Configuration Options** organized in 6 sections (Storybook-style UI)
- **9 Programming Languages** with syntax highlighting
- **Custom Language Support** for N1QL and SQL++
- **Theme Switching** (Light/Dark modes)
- **Live Preview** with instant configuration updates
- **Export/Import** configurations as JSON

### Search Workbench (Couchbase FTS)
- **Intelligent JSON Editor** for search queries
- **Hover Documentation** - 69 markdown help files
- **Autocomplete** for query keywords
- **Real-time Validation** with inline error markers
- **Query Execution** with formatted results
- **Configurable Features** via feature flags

## 📁 What's Included

```
editor-test-app/
├── src/
│   ├── components/
│   │   ├── editor/              # Reusable Monaco editor component
│   │   ├── SearchWorkbench/     # Couchbase FTS query interface
│   │   └── controls/            # Configuration controls
│   ├── services/
│   │   └── searchWorkbench/     # Search query services & docs
│   ├── constants/               # Sample code & options
│   └── App.tsx                  # Main application
├── public/
│   └── docs/search/             # 69 markdown documentation files
└── Documentation (see below)
```

## 📚 Documentation

### For Demo & Quick Start
- **DEMO_GUIDE.md** - Demo walkthrough (5 min)
- **QUICKSTART.md** - Get running in 3 steps

### For Technical Users
- **STORYBOOK_GUIDE.md** - All 55 configuration options
- **FEATURE_TESTING_GUIDE.md** - Feature testing scenarios

### For Developers
- **REFACTORING_GUIDE.md** - Code structure & patterns
- **src/services/searchWorkbench/** - Search Workbench docs

## 🎮 Demo Highlights

### 1. Monaco Editor Playground
- Switch languages instantly
- Adjust 55+ options live
- Export your perfect configuration
- Professional Storybook-style UI

### 2. Search Workbench
- Type search queries with IntelliSense
- Hover over keywords for documentation
- See real-time validation errors
- Execute queries and view results

## 🛠️ Technologies

- **React 18** + **TypeScript** + **Vite**
- **Monaco Editor** (VSCode's editor)
- **SCSS** for styling
- **jsonc-parser** for JSON parsing

## 📊 Stats

- **55 Configuration Controls**
- **9 Supported Languages**
- **69 Documentation Files**
- **6 Organized Sections**
- **~30% Feature Parity** with VSCode-Couchbase (growing)

## 🎯 Use Cases

1. **Testing Monaco Editor** - Try all configuration options
2. **Learning Search Queries** - Interactive documentation
3. **Prototyping** - Quickly test editor integrations
4. **Demo Tool** - Show editor capabilities to stakeholders

## 📝 License

Demonstration and testing purposes.

---

**Ready for your demo!** 🎉
See **DEMO_GUIDE.md** for a complete walkthrough.
