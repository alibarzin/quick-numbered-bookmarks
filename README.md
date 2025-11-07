# Numbered Bookmarks for VS Code

A clean, lightweight Visual Studio Code extension that lets you **add and jump to numbered bookmarks (0–9)** using simple keyboard shortcuts. Perfect for developers who want a fast, predictable way to mark and return to important lines of code.

---

## 🚀 Features

* **Numbered bookmarks (0–9)** that you can set and jump to instantly.
* **Cross-file support** – each bookmark remembers its file and exact position.
* **Persistent bookmarks** stored per workspace.
* **Fast navigation** with direct keyboard shortcuts (no command palette needed).
* Optional **quick list** command to view all bookmarks at once.

---

## ⌨️ Default Keybindings

| Action             | Windows / Linux         | macOS                  |
| :----------------- | :---------------------- | :--------------------- |
| **Add bookmark**   | `Ctrl + Alt + <number>` | `Cmd + Alt + <number>` |
| **Go to bookmark** | `Ctrl + <number>`       | `Cmd + <number>`       |

Example:

* `Ctrl + Alt + 1` → Add bookmark 1 at current cursor.
* `Ctrl + 1` → Jump to bookmark 1.

You can configure these in VS Code → **Keyboard Shortcuts** → search for *Numbered Bookmarks*.

---

## 🧭 Quick Commands

Command Palette → search for:

* **Add Bookmark N** → manually set a numbered bookmark.
* **Go To Bookmark N** → jump to one.
* **List Numbered Bookmarks** → view all bookmarks in a quick-pick menu.

---

## 🧰 Installation

### From VSIX

1. Run `npm install --global yo generator-code vsce` if not installed.
2. Run `vsce package` inside the extension folder.
3. Install with:

   ```bash
   code --install-extension numbered-bookmarks-*.vsix
   ```

### From Source

1. Clone or create via `yo code`:

   ```bash
   yo code
   ```

   Choose **New Extension (TypeScript)**.
2. Replace files with the provided code.
3. Run:

   ```bash
   npm install
   npm run compile
   ```
4. Press `F5` to launch an Extension Development Host and test.

---

## ⚙️ Configuration

* Bookmarks are saved **per workspace**. If you prefer them to be global, change storage from `workspaceState` → `globalState` in `src/extension.ts`.
* You can expand the keybinding range to more numbers or custom keys easily via `package.json`.

---

## 🧩 Example Workflow

1. You’re debugging a complex function.
2. You set `Ctrl + Alt + 1` at the function start.
3. You scroll down 300 lines and set `Ctrl + Alt + 2` where the return statement is.
4. Jump between them instantly with `Ctrl + 1` and `Ctrl + 2`.

No more manual scrolling or temporary TODO comments.

---

## 💡 Ideas for Future Updates

* Visual gutter markers next to bookmarked lines.
* Syncing bookmarks across workspaces.
* Labels or notes per bookmark.

---

## 🤝 Contributing

Pull requests and suggestions are always welcome.
If you want to improve the UX (e.g., icons, per-file lists, or synchronization), open an issue or PR.

---

## 🪶 License

MIT License © 2025 — Your Name

---

## 📸 Preview (optional)

Add a short GIF or screenshot showing setting and jumping to bookmarks:

```text
[Editor screenshot]
Ctrl + Alt + 3 → Bookmark added.
Ctrl + 3 → Instantly jumps to it.
```

---

Enjoy smooth and fast navigation with **Numbered Bookmarks** — because your code deserves precision, not scrolling.
