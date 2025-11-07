# 🔢 Numbered Bookmarks for VS Code

A clean, fast, and reliable Visual Studio Code extension that lets you **add, remove, and jump to numbered bookmarks (0–9)** with simple keyboard shortcuts — just like in JetBrains Rider.
Perfect for developers who want a **quick and precise way** to mark and navigate important code lines without losing focus.

---

## 🚀 Features

✅ **Toggle numbered bookmarks (0–9)** — add or remove with the same shortcut.
✅ **Cross-file support** — each bookmark remembers its file and exact cursor position.
✅ **Persistent per-workspace** — bookmarks are saved automatically.
✅ **Quick navigation** — jump instantly without the command palette.
✅ **Bookmark list** — view all bookmarks and jump to any of them in seconds.

---

## ⌨️ Default Keybindings

| Action              | Windows / Linux           | macOS                    |
| :------------------ | :------------------------ | :----------------------- |
| **Toggle bookmark** | `Ctrl + Shift + <number>` | `Cmd + Shift + <number>` |
| **Go to bookmark**  | `Ctrl + <number>`         | `Cmd + <number>`         |

### Example

* `Ctrl + Shift + 1` → Add or remove bookmark **#1** on current line.
* `Ctrl + 1` → Instantly jump to bookmark **#1**.

You can customize these shortcuts in:
**File → Preferences → Keyboard Shortcuts** → search *Numbered Bookmarks*.

---

## 🧭 Commands

Open **Command Palette (Ctrl + Shift + P)** and type:

* `Numbered Bookmarks: Toggle Bookmark N` → Set or remove bookmark **N**.
* `Numbered Bookmarks: Go To Bookmark N` → Jump to bookmark **N**.
* `Numbered Bookmarks: List Bookmarks` → View all bookmarks in a quick-pick menu.

---

## 🧰 Installation

### 🔹 From VSIX

1. Run:

   ```bash
   npm install --global yo generator-code vsce
   ```
2. Package your extension:

   ```bash
   vsce package
   ```
3. Install into VS Code:

   ```bash
   code --install-extension numbered-bookmarks-*.vsix
   ```

### 🔹 From Source

1. Clone or create via Yeoman:

   ```bash
   yo code
   ```

   Choose **New Extension (TypeScript)**.
2. Replace the generated code with this repository’s files.
3. Compile and run:

   ```bash
   npm install
   npm run compile
   ```
4. Press **F5** to open the Extension Development Host for testing.

---

## ⚙️ Configuration

* Bookmarks are stored **per workspace** (via `workspaceState`).
  To make them **global**, switch to `globalState` in `src/extension.ts`.
* Customize keybindings or add more numbers easily via `package.json`.

---

## 🧩 Example Workflow

1. You set `Ctrl + Shift + 1` at the start of a long function.
2. You add `Ctrl + Shift + 2` at the return statement.
3. You jump between them instantly with `Ctrl + 1` and `Ctrl + 2`.
4. Hit `Ctrl + Shift + 1` again to remove the bookmark when done.

No more losing track or scrolling endlessly.

---

## 🤝 Contributing

Contributions are welcome!
If you have suggestions, bug reports, or want to enhance the experience, open an issue or submit a PR.

---

## 🪶 License

**MIT License** © 2025 — *Alireza Barzin*

---

## 📸 Preview (optional)

```text
[Editor screenshot]
Ctrl + Shift + 3 → Bookmark [3] added.
Ctrl + 3 → Instantly jumps to bookmark [3].
Ctrl + Shift + 3 → Bookmark [3] removed.
```

---

⚡ **Numbered Bookmarks** — simple, fast, and built for developers who hate losing their place.