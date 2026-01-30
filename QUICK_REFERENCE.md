# Quick Reference Card

## 🚀 Getting Started

```bash
npm install && npm run dev
```
Open: **http://localhost:5173**

---

## 🎯 Monaco Editor Playground

### 6 Configuration Sections

| Tab | What It Controls | Key Options |
|-----|------------------|-------------|
| **🎯 Basic** | Core settings | Languages, themes, font size, read-only |
| **🎨 Display** | Visual appearance | Cursor style, line numbers, whitespace |
| **✏️ Editing** | Edit behavior | Indentation, auto-closing, formatting |
| **💡 Suggestions** | IntelliSense | Autocomplete, tab completion |
| **🔧 Advanced** | Power features | Bracket colors, indent guides |
| **📐 Layout** | UI layout | Scrollbars, minimap, folding |

### Quick Actions

- **📋 Copy Config** - Export configuration as JSON
- **🔄 Reset All** - Restore default settings

---

## 🔍 Search Workbench

### Key Features

| Feature | How to Use | What It Does |
|---------|------------|--------------|
| **Hover Docs** | Hover over any keyword | Shows documentation |
| **Autocomplete** | Type `"` inside JSON object | Suggests keywords |
| **Validation** | Type JSON query | Real-time error checking |
| **Run Query** | Click "Run Query" button | Executes search (mock) |

### Sample Query

```json
{
  "query": {
    "match": "search text"
  },
  "fields": ["*"],
  "size": 10
}
```

**Try hovering over**: `query`, `match`, `fields`, `size`

---

## 🧪 Quick Tests

### Test 1: Transform Editor (30s)
1. **Display** tab → Cursor Style = "Block"
2. **Display** tab → Line Numbers = "Relative"
3. See editor transform!

### Test 2: Hover Documentation (30s)
1. Go to Search Workbench
2. Hover over `"query"` in JSON
3. See documentation tooltip

### Test 3: Autocomplete (30s)
1. In Search Workbench, type `{` then `"`
2. See keyword suggestions
3. Select one and press Enter

### Test 4: Export Config (15s)
1. Adjust some settings
2. Click "📋 Copy Config"
3. Paste to see JSON

---

## 📖 Documentation Links

| For... | See... |
|--------|--------|
| **Demo presentation** | `DEMO_GUIDE.md` |
| **Getting started** | `QUICKSTART.md` or `START_HERE.md` |
| **All 55 options** | `STORYBOOK_GUIDE.md` |
| **Feature roadmap** | `FEATURE_COMPARISON.md` |
| **Full details** | `README.md` |

---

## 💡 Pro Tips

✅ Use tabs to keep settings organized  
✅ Hover over any Search Workbench keyword for help  
✅ Type `"` for autocomplete suggestions  
✅ Export config to share with teammates  
✅ Reset anytime if you get lost

---

## 🐛 Troubleshooting

**Editor not loading?**  
→ Refresh page (Ctrl+R)

**Hover not working?**  
→ Hover over the **key name** (in quotes), wait 500ms

**Autocomplete not showing?**  
→ Type `"` (quote) inside a JSON object

**Run button?**  
→ It's **inside the editor** at top-right (enable in Basic tab)

---

## 📊 Stats

- **55** configuration controls
- **9** programming languages
- **69** documentation files
- **6** organized sections
- **~30%** feature parity with VSCode extension

---

**Quick start**: `npm run dev` → Open browser → Explore! 🎉
