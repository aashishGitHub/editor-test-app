# Demo Guide - Monaco Editor Test Application

## 🎯 5-Minute Demo Script

This guide helps you demonstrate the key capabilities to a techno-functional audience.

---

## Prerequisites (30 seconds)

```bash
# Ensure app is running
npm run dev
# Open http://localhost:5173
```

---

## Demo Flow

### Part 1: Monaco Editor Playground (2 minutes)

#### Show: Storybook-Style Configuration (30s)

**SAY**: "This is a professional configuration tool with 55 options organized like Storybook."

**DO**:
1. Click through tabs: **Basic** → **Display** → **Editing** → **Suggestions** → **Advanced** → **Layout**
2. Point out: "Each section groups related settings—no overwhelming lists."

#### Show: Live Configuration (45s)

**SAY**: "Every change applies instantly. Let's transform the editor."

**DO**:
1. **Display Tab** → Cursor Style = "Block"
2. **Display Tab** → Line Numbers = "Relative"  
3. **Display Tab** → Render Whitespace = "All"
4. **Basic Tab** → Language = "Python"
5. **Basic Tab** → Theme = "Light"

**RESULT**: Editor now has block cursor, relative line numbers, visible whitespace, Python syntax

#### Show: Export Configuration (30s)

**SAY**: "You can export and share configurations with your team."

**DO**:
1. Click **"📋 Copy Config"** button (top-right)
2. Paste into notepad/console
3. Show JSON output

**SAY**: "Developers can use this JSON in their applications."

---

### Part 2: Search Workbench (3 minutes)

#### Show: Interface Tour (30s)

**SAY**: "The Search Workbench helps users build Couchbase FTS queries."

**DO**:
1. Click **"Search Workbench"** tab (left sidebar or navigation)
2. Point out sections:
   - **Editor** (JSON query)
   - **Controls** (Run/Format buttons)
   - **Results** (query output)

#### Show: Hover Documentation (60s)

**SAY**: "Users get instant help by hovering over any keyword."

**DO**:
1. In the editor, type or ensure this query exists:
```json
{
  "query": {
    "match": "search text"
  },
  "fields": ["*"],
  "size": 10
}
```

2. **Hover over** `"query"` → Show tooltip
3. **Hover over** `"match"` → Show tooltip  
4. **Hover over** `"fields"` → Show tooltip
5. **Hover over** `"size"` → Show tooltip

**SAY**: "All 69 documentation topics are context-aware markdown files."

#### Show: Autocomplete (45s)

**SAY**: "IntelliSense suggests valid keywords as you type."

**DO**:
1. Delete `"size": 10` line
2. Add a new line inside the root object
3. Type `"` (quote) and pause
4. **Show autocomplete dropdown** with keywords: `query`, `knn`, `fields`, `highlight`, etc.
5. Select `"limit"` from suggestions
6. Complete: `"limit": 20`

**SAY**: "Autocomplete reduces errors and speeds up query writing."

#### Show: Validation (45s)

**SAY**: "Real-time validation catches errors immediately."

**DO**:
1. Break the JSON:
   - Remove a closing brace `}`
   - Or add an extra comma
2. **Show red error marker** in editor
3. **Hover over error** to see message
4. **Fix the error** → marker disappears

**SAY**: "Validation ensures queries are syntactically correct before execution."

#### Show: Query Execution (30s)

**SAY**: "Users can run queries and see formatted results."

**DO**:
1. Ensure query is valid
2. Click **"Run Query"** button
3. **Show loading spinner** (if fast, mention it)
4. **Show results** in Results panel below
5. Point out:
   - Formatted JSON output
   - Query status (success/error)
   - Execution time (mock)

---

## Key Talking Points

### For Business Stakeholders
- ✅ **Reduces training time** - Built-in documentation
- ✅ **Fewer errors** - Real-time validation
- ✅ **Faster development** - Autocomplete & templates
- ✅ **Better UX** - Professional, intuitive interface

### For Technical Users
- ✅ **55+ Monaco Editor options** - Most comprehensive playground
- ✅ **69 markdown docs** - Context-aware help system
- ✅ **Feature flags** - Enable/disable features via config
- ✅ **~30% parity** with VSCode extension (growing)

### For Developers
- ✅ **Reusable components** - Drop into any React app
- ✅ **TypeScript** - Full type safety
- ✅ **Configurable** - Export/import configurations
- ✅ **Extensible** - Add more languages, validators, contributors

---

## Common Questions & Answers

**Q: Is this production-ready?**
A: The Monaco Editor playground is ready. Search Workbench is in active development (~30% feature complete).

**Q: Can we customize it?**
A: Yes! It's a React app with modular components. Add your own languages, validators, and themes.

**Q: What's the roadmap?**
A: Next features: Index Parser → Field Autocomplete → Advanced Validators → Query Templates.

**Q: How does it compare to VSCode extension?**
A: It mirrors the VSCode-Couchbase Search Workbench but runs in a browser. See `FEATURE_COMPARISON.md` for details.

**Q: Can we use this internally?**
A: Yes! It's a standalone React application. Deploy it to your internal servers.

---

## Demo Tips

### Before Demo
- ✅ `npm run dev` and test
- ✅ Have sample queries ready
- ✅ Clear browser cache (if needed)
- ✅ Prepare any custom examples

### During Demo
- 🎯 Focus on **value**, not technical details
- 🎯 Let them **drive** - ask what they want to see
- 🎯 Show **before/after** (with and without features)
- 🎯 Mention **time savings** and **error reduction**

### After Demo
- 📋 Share this guide
- 📋 Share `FEATURE_COMPARISON.md` (what's next)
- 📋 Share `STORYBOOK_GUIDE.md` (detailed options)

---

## Quick Troubleshooting

**Editor not loading?**
- Check browser console for errors
- Refresh page (Ctrl+R / Cmd+R)

**Hover not working?**
- Ensure you're hovering over the **key name** (in quotes)
- Wait 500ms for tooltip to appear

**Autocomplete not showing?**
- Type `"` (quote) inside a JSON object
- Ensure cursor is in a valid position

**Run button not working?**
- Currently uses mock data (expected)
- Check browser console for logs

---

## Next Steps After Demo

1. **Gather feedback** - What features matter most?
2. **Prioritize roadmap** - See `FEATURE_COMPARISON.md`
3. **Plan integration** - How will this fit your workflow?
4. **Discuss customization** - Branding, additional features, etc.

---

**Demo Duration**: 5 minutes (flexible)  
**Audience**: Techno-functional teams, stakeholders, developers  
**Goal**: Show value, gather feedback, plan next steps

---

**Good luck with your demo!** 🚀
