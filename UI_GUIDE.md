# 🎨 UI Guide - Where Everything Is

## 📍 Where is the Run Button? ▶️

The **Run Button** appears **inside the editor component** at the top-right corner!

### To See the Run Button:
1. ✅ Check the **"Show Run Button ▶️"** checkbox in **Editor Behavior** section
2. Look at the **top-right corner INSIDE the editor** (not outside)
3. You'll see a **circular play button** (▶️)
4. Click it to execute the code!

```
┌─────────────────────────────────────────────┐
│ Editor Preview              Changes: 5      │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │                              [▶️] ← HERE!│ │
│ │ Code editor content...                  │ │
│ │                                         │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## 🎛️ New Dropdown Controls

### Display Options Section (NEW! ⭐)

#### 1. **Word Wrap Dropdown**
```
┌──────────────────────────┐
│ Word Wrap                │
│ ┌──────────────────────┐ │
│ │ ▼ On                 │ │ ← Click to open dropdown
│ └──────────────────────┘ │
└──────────────────────────┘
```

**Options:**
- **Off** - No wrapping, text scrolls horizontally
- **On** - Wraps at viewport width (recommended)
- **Word Wrap Column** - Wraps at specific column
- **Bounded** - Combination of viewport and column

**Try it:** Select "Off" and type a very long line to see horizontal scrolling!

#### 2. **Cursor Style Dropdown**
```
┌──────────────────────────┐
│ Cursor Style             │
│ ┌──────────────────────┐ │
│ │ ▼ Line               │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

**Options:**
- **Line** - Standard vertical line cursor (|)
- **Block** - Filled block cursor (█)
- **Underline** - Underline cursor (_)
- **Line Thin** - Thinner vertical line
- **Block Outline** - Hollow block outline
- **Underline Thin** - Thinner underline

**Try it:** Select each option and move the cursor in the editor!

#### 3. **Line Numbers Dropdown**
```
┌──────────────────────────┐
│ Line Numbers             │
│ ┌──────────────────────┐ │
│ │ ▼ On (Absolute)      │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

**Options:**
- **On (Absolute)** - Shows 1, 2, 3, 4...
- **Relative** - Shows distance from cursor (0, 1, 2...)
- **Off** - No line numbers

**Try it:** Select "Relative" and move cursor up/down to see numbers change!

#### 4. **Render Whitespace Dropdown**
```
┌──────────────────────────┐
│ Render Whitespace        │
│ ┌──────────────────────┐ │
│ │ ▼ None               │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

**Options:**
- **None** - Don't show whitespace
- **Boundary** - Show whitespace at boundaries
- **Selection** - Show whitespace in selection
- **All** - Show all spaces/tabs as dots/arrows

**Try it:** Select "All" and see spaces as dots (·) and tabs as arrows (→)!

## 📊 Complete UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│                  Monaco Editor Test App                      │
│            Test all features of the Monaco Editor            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CONTROLS PANEL                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Language Selection                                           │
│ [JavaScript] [TypeScript] [Python] [Java] [JSON]...         │
│                                                              │
│ Theme                                                        │
│ [Dark Theme] [Light Theme]                                   │
│                                                              │
│ Font Size                    Line Height                     │
│ ━━━●━━━━━━ 16px             ━━━━━●━━━━ 1.6                  │
│                                                              │
│ Editor Height                                                │
│ ━━━━━━●━━━━ 500px                                           │
│                                                              │
│ Editor Behavior                                              │
│ ☐ Read Only                                                  │
│ ☑ Show Run Button ▶️ (Top-right in editor) ← IMPORTANT!     │
│ ☐ Show Minimap                                               │
│ ☑ Scroll Beyond Last Line                                    │
│ ☐ Enable Schema Doc (N1QL/SQL++)                            │
│                                                              │
│ Display Options ⭐ NEW!                                       │
│ Word Wrap: [▼ On                ]                            │
│ Cursor Style: [▼ Line              ]                         │
│ Line Numbers: [▼ On (Absolute)     ]                         │
│ Render Whitespace: [▼ None         ]                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Editor Preview              [Changes: 5] [Lines: 14] [Chars: 312] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                              [▶️] ← RUN! │ │
│ │  1  function greet(name) {                              │ │
│ │  2    console.log(`Hello, ${name}!`);                   │ │
│ │  3    return `Welcome to Monaco Editor`;               │ │
│ │  4  }                                                    │ │
│ │  5                                                       │ │
│ │  6  const result = greet('World');                      │ │
│ │  7  console.log(result);                                │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Paste Events                                    [Clear]      │
├─────────────────────────────────────────────────────────────┤
│ 📋 Pasted at line 5                                         │
│ 📋 Pasted at line 2                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Activity Log                                    [Clear]      │
├─────────────────────────────────────────────────────────────┤
│ [14:30:15] Code executed in javascript                      │
│ [14:29:58] Paste event detected                             │
│ [14:29:45] Language changed to: javascript                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Output                                          [Clear]      │
├─────────────────────────────────────────────────────────────┤
│ Executed code in javascript at 2:30:15 PM                   │
│                                                              │
│ Code:                                                        │
│ function greet(name) { ... }                                │
└─────────────────────────────────────────────────────────────┘
```

## 🎮 Quick Test Guide for New Features

### Test Dropdowns (1 minute)

1. **Word Wrap**
   ```
   1. Type a very long line in the editor
   2. Change Word Wrap: Off → On → Off
   3. See wrapping behavior change
   ```

2. **Cursor Style**
   ```
   1. Click in the editor
   2. Change Cursor Style: Line → Block → Underline
   3. Move cursor around to see different styles
   ```

3. **Line Numbers**
   ```
   1. Check current line numbers (1, 2, 3...)
   2. Change to "Relative"
   3. Move cursor to line 5
   4. See: 3, 2, 1, 0, 1, 2, 3 (relative to cursor!)
   5. Change to "Off" - no numbers!
   ```

4. **Render Whitespace**
   ```
   1. Type: "hello    world" (multiple spaces)
   2. Change to "All"
   3. See: "hello····world" (dots for spaces!)
   4. Press Tab
   5. See: "→" (arrow for tab!)
   ```

### Test New Checkboxes

5. **Minimap**
   ```
   1. Check "Show Minimap"
   2. See small code overview on the right side of editor
   3. Scroll or click minimap to navigate
   ```

6. **Scroll Beyond Last Line**
   ```
   1. Uncheck this option
   2. Scroll down - stops at last line
   3. Check it again
   4. Scroll down - can scroll past last line
   ```

## 🔍 Finding the Run Button

### Visual Clues:
- ✅ Purple/green circular button
- ✅ Located **INSIDE** the editor component
- ✅ Top-right corner (same row as the first line of code)
- ✅ Only visible when "Show Run Button ▶️" is checked
- ✅ Hovers above the editor content

### If You Don't See It:
1. Check "Show Run Button ▶️" checkbox
2. Look at the **top-right corner of the editor** (not the page)
3. Make sure you're looking **inside the bordered editor area**
4. It should be next to the first line of code

### When You Click It:
- Output panel appears below
- Shows execution timestamp
- Displays the code that was "executed"
- Activity log records the action

## 🎨 Visual Differences

### Word Wrap OFF:
```
1  function greet(name) { console.log(`Hello, ${name}!`); return `Welcome to Monaco Ed→
```
↑ Text extends beyond screen, scrollbar appears

### Word Wrap ON:
```
1  function greet(name) { 
2    console.log(`Hello, ${name}!`); 
3    return `Welcome to Monaco Editor`; 
4  }
```
↑ Text wraps to fit viewport

### Cursor Styles:

**Line:** `console|.log`  (vertical line)
**Block:** `console█log`  (filled block)
**Underline:** `console_log` (underline)

### Line Numbers:

**Absolute:**
```
1  function greet(name) {
2    console.log('Hello');
3    return 'Welcome';
4  }
```

**Relative (cursor on line 2):**
```
1  function greet(name) {
0    console.log('Hello');  ← cursor here
1    return 'Welcome';
2  }
```

## 📝 Pro Tips

1. **Combo Testing**: Try cursor style "Block" + render whitespace "All" + relative line numbers
2. **Minimap**: Great for large files - test with a longer code sample
3. **Word Wrap Modes**: "Bounded" is best of both worlds
4. **Whitespace**: Use "Selection" to see spaces only in selected text
5. **Run Button**: Click it multiple times to see activity log build up!

## 🎯 All Features Summary

**Sliders (4):**
- Font Size: 10-30px
- Line Height: 1.0-3.0
- Editor Height: 200-800px

**Dropdowns (4):** ⭐ NEW!
- Word Wrap: 4 options
- Cursor Style: 6 options
- Line Numbers: 3 options
- Render Whitespace: 4 options

**Checkboxes (5):**
- Read Only
- Show Run Button ▶️
- Show Minimap ⭐ NEW!
- Scroll Beyond Last Line ⭐ NEW!
- Enable Schema Doc

**Language Buttons (9):**
- JavaScript, TypeScript, Python, Java, JSON, N1QL, SqlPlusPlus, Shell, Text

**Theme Buttons (2):**
- Dark Theme, Light Theme

---

**Total Interactive Controls: 24!**

Enjoy testing! 🚀

