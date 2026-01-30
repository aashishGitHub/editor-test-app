export const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2>Editor Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>✨ Syntax Highlighting</h3>
          <p>Support for multiple programming languages with syntax highlighting</p>
        </div>
        <div className="feature-card">
          <h3>🎨 Custom Themes</h3>
          <p>Switch between light and dark themes</p>
        </div>
        <div className="feature-card">
          <h3>🔧 Configurable</h3>
          <p>Font size, word wrap, read-only mode, and more</p>
        </div>
        <div className="feature-card">
          <h3>▶️ Run Button</h3>
          <p>Optional run button for executing code</p>
        </div>
        <div className="feature-card">
          <h3>🗃️ Custom Languages</h3>
          <p>Support for custom languages like N1QL and SQL++</p>
        </div>
        <div className="feature-card">
          <h3>📝 Monaco Editor</h3>
          <p>Powered by the same editor that powers VS Code</p>
        </div>
      </div>
    </div>
  );
};





