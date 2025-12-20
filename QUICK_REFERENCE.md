# 🚀 Quick Reference Card

## ❓ WHERE IS THE RUN BUTTON?

### The run button (▶️) is INSIDE the editor, at the top-right corner!

```
┌─────────────────────────────────────┐
│ Editor Preview                      │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                        [▶️] ← HERE!│
│ │ 1  function hello() {           │ │
│ │ 2    console.log("Hi");         │ │
│ │ 3  }                            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**To see it:**
1. ✅ Check "Show Run Button ▶️" in **Editor Behavior**
2. 👀 Look at top-right corner **INSIDE** the editor box
3. 🎯 It's a circular purple/green play button

---

## 🎛️ NEW DROPDOWN CONTROLS

Located in the **Display Options** section (below checkboxes):

### 1. Word Wrap
```
[▼ On                    ]
```
- **Off** - Horizontal scroll
- **On** - Wrap at viewport ✓ Recommended
- **Word Wrap Column** - Wrap at column
- **Bounded** - Mixed mode

### 2. Cursor Style
```
[▼ Line                  ]
```
- **Line** - | (standard)
- **Block** - █ (filled box)
- **Underline** - _ (underline)
- **Line Thin** - thinner |
- **Block Outline** - hollow □
- **Underline Thin** - thinner _

### 3. Line Numbers
```
[▼ On (Absolute)         ]
```
- **On** - 1, 2, 3, 4...
- **Relative** - Distance from cursor
- **Off** - No numbers

### 4. Render Whitespace
```
[▼ None                  ]
```
- **None** - Hidden
- **Boundary** - At edges
- **Selection** - In selected text
- **All** - Show all (· for space, → for tab)

---

## 🆕 NEW CHECKBOXES

In **Editor Behavior** section:

### Show Minimap
- ☐ Off = No minimap
- ☑ On = Code overview on right side

### Scroll Beyond Last Line
- ☐ Off = Stop at last line
- ☑ On = Can scroll past end

---

## 🧪 Quick Tests (30 seconds each)

### Test 1: Find the Run Button
```bash
1. Check "Show Run Button ▶️" checkbox
2. Look TOP-RIGHT inside editor (not page)
3. Click the play button ▶️
4. See output appear below!
```

### Test 2: Try All Cursor Styles
```bash
1. Open "Cursor Style" dropdown
2. Select "Block"
3. Click in editor - see block cursor █
4. Try "Underline" - see _ cursor
5. Back to "Line" - see | cursor
```

### Test 3: Relative Line Numbers
```bash
1. Open "Line Numbers" dropdown
2. Select "Relative"
3. Click on line 5 in editor
4. See: 2, 1, 0 ←cursor, 1, 2
5. Move cursor - numbers change!
```

### Test 4: Show All Whitespace
```bash
1. Type: "hello    world" (spaces)
2. Open "Render Whitespace"
3. Select "All"
4. See: "hello····world" (dots!)
5. Press Tab - see → (arrow!)
```

### Test 5: Enable Minimap
```bash
1. Check "Show Minimap"
2. See code overview on right
3. Scroll with minimap
4. Click minimap to jump
```

---

## 📊 Controls Summary

| Control | Type | Count | Location |
|---------|------|-------|----------|
| Languages | Buttons | 9 | Language Selection |
| Themes | Buttons | 2 | Theme |
| Font Size | Slider | 1 | Font Size |
| Line Height | Slider | 1 | Line Height |
| Editor Height | Slider | 1 | Editor Height |
| Checkboxes | Toggle | 5 | Editor Behavior |
| **Dropdowns** | **Select** | **4** | **Display Options** ⭐ |

**Total: 24 interactive controls!**

---

## 🎯 Most Important

### 1. RUN BUTTON LOCATION ▶️
**Top-right corner INSIDE the editor component**
(Enable with "Show Run Button ▶️" checkbox)

### 2. DROPDOWNS LOCATION 🎛️
**In "Display Options" section**
(Below the checkboxes)

### 3. NEW FEATURES ⭐
- 4 dropdowns with multiple options
- Minimap toggle
- Scroll beyond last line toggle
- Better organized UI

---

## 💡 Pro Tips

1. **Try combinations**: Block cursor + relative numbers + show whitespace
2. **Long text test**: Type long line, toggle word wrap on/off
3. **Minimap magic**: Great for navigating large files
4. **Whitespace debug**: Use "All" to see invisible characters
5. **Run button**: Visible only when checkbox is checked!

---

## 📖 More Info

- **Full UI Guide**: See `UI_GUIDE.md`
- **Feature Testing**: See `FEATURE_TESTING_GUIDE.md`
- **What's New**: See `WHATS_NEW.md`
- **Main Docs**: See `README.md`

---

**App is running at: http://localhost:5173** 🚀

**Quick start:** `npm run dev`

