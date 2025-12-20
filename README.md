# Monaco Editor Test App

A comprehensive React + Vite application to test and demonstrate the Monaco Editor component with all its features.

## 🚀 Features

This test app showcases the following Monaco Editor features:

- **Multiple Language Support**: JavaScript, TypeScript, Python, Java, JSON, N1QL, SQL++, Shell, and plain text
- **Custom Languages**: N1QL and SQL++ with custom syntax highlighting
- **Theme Switching**: Toggle between light and dark themes
- **Configurable Options**:
  - Font size adjustment (10-30px)
  - Read-only mode
  - Word wrap toggle
  - Optional run button
- **Syntax Highlighting**: Full syntax highlighting for all supported languages
- **Monaco Editor Core**: Powered by the same editor that powers VS Code

## 📦 Installation

1. Navigate to the project directory:
```bash
cd editor-test-app
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the App

### Development Mode
Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎮 How to Use

1. **Select a Language**: Click on any language button to switch the editor language
2. **Change Theme**: Toggle between dark and light themes
3. **Adjust Font Size**: Use the slider to change the editor font size
4. **Toggle Options**: 
   - Enable/disable read-only mode
   - Show/hide the run button
   - Toggle word wrap
5. **Run Code**: Click the play button (if enabled) to execute the current code
6. **Edit Code**: Type directly in the editor to modify the code

## 📁 Project Structure

```
editor-test-app/
├── src/
│   ├── components/
│   │   ├── editor/
│   │   │   ├── editor.tsx              # Main editor component
│   │   │   ├── editor.types.ts         # TypeScript types
│   │   │   ├── languages/
│   │   │   │   ├── custom/
│   │   │   │   │   ├── n1ql/          # N1QL language support
│   │   │   │   │   ├── sql-plus-plus/  # SQL++ language support
│   │   │   │   │   └── custom-java/    # Custom Java support
│   │   │   │   └── types.ts
│   │   │   ├── utils/
│   │   │   │   ├── configure-monaco.ts # Monaco configuration
│   │   │   │   ├── custom-languages.ts # Custom language utilities
│   │   │   │   └── get-styles.ts       # Style utilities
│   │   │   └── styles/
│   │   │       └── editor.scss
│   │   ├── icon/
│   │   │   ├── icon.tsx                # Icon component
│   │   │   └── icon.types.ts
│   │   └── spinner/
│   │       ├── spinner.tsx             # Spinner component
│   │       ├── spinner.types.ts
│   │       └── spinner.module.scss
│   ├── styles/
│   │   └── variables.scss
│   ├── App.tsx                         # Main app component
│   ├── App.css                         # App styles
│   ├── main.tsx                        # Entry point
│   └── index.css                       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Monaco Editor**: Code editor component
- **@monaco-editor/react**: React wrapper for Monaco
- **Sass**: CSS preprocessing

## 🔧 Configuration

The editor can be configured through the following props:

- `editorId`: Unique identifier for the editor
- `language`: Programming language (see SupportedLanguage type)
- `value`: Initial code value
- `theme`: 'vs-dark' or 'vs-light'
- `onRun`: Callback function for the run button
- `readOnly`: Make the editor read-only
- `fontSize`: Font size in pixels
- `lineHeight`: Line height multiplier
- `wordWrap`: Word wrap setting ('on' | 'off' | 'wordWrapColumn' | 'bounded')
- `onChange`: Callback for content changes
- `onDidPaste`: Callback for paste events
- `height`: Editor height (CSS dimension)

## 📝 Example Usage

```tsx
import { Editor } from './components/editor/editor';

function MyComponent() {
  const handleRun = () => {
    console.log('Code executed!');
  };

  return (
    <Editor
      language="javascript"
      value="console.log('Hello, World!');"
      theme="vs-dark"
      onRun={handleRun}
      fontSize={16}
      height="400px"
    />
  );
}
```

## 🎨 Custom Languages

The app includes custom language support for:

### N1QL
Couchbase N1QL (SQL for JSON) with keywords like SELECT, FROM, WHERE, UNNEST, etc.

### SQL++
Enhanced SQL with additional features for JSON data manipulation.

### CustomJava
Java with custom configurations.

## 🐛 Troubleshooting

If you encounter any issues:

1. **Port already in use**: Vite will automatically try the next available port
2. **Dependencies not installed**: Run `npm install` again
3. **Build errors**: Try deleting `node_modules` and running `npm install` again
4. **Editor not loading**: Check browser console for errors

## 📄 License

This is a test application for demonstration purposes.

## 🤝 Contributing

This is a test app. Feel free to modify and extend it as needed.

## 📧 Support

For issues with the Monaco Editor component itself, refer to the original implementation in the VSCode-Couchbase project.

