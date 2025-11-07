import * as vscode from 'vscode';

type Bookmark = { uri: string; line: number; character: number };
const STORAGE_KEY = 'numberedBookmarks';

// Store decoration types for numbers 0..9
const decorations: vscode.TextEditorDecorationType[] = [];

export function activate(context: vscode.ExtensionContext) {
	const state = context.workspaceState;

	// Initialize storage if missing
	if (!state.get(STORAGE_KEY)) {
		const empty: (Bookmark | null)[] = new Array(10).fill(null);
		state.update(STORAGE_KEY, empty);
	}

	// Create a decoration type for each number
	for (let i = 0; i <= 9; i++) {
		decorations[i] = vscode.window.createTextEditorDecorationType({
			gutterIconPath: undefined, // No image
			before: {
				contentText: `[${i}]`,
				color: new vscode.ThemeColor('editorLineNumber.foreground'),
				margin: '0 0 0 -1ch'
			}
		});
	}

	// Register commands for 0..9
	for (let i = 0; i <= 9; i++) {
		const toggleCmd = `numberedBookmarks.toggle${i}`;

		// Toggle bookmark
		const toggleDisposable = vscode.commands.registerCommand(toggleCmd, async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showWarningMessage('No active editor to toggle a bookmark.');
				return;
			}
			const doc = editor.document;
			const pos = editor.selection.active;
			const bookmark: Bookmark = { uri: doc.uri.toString(), line: pos.line, character: pos.character };

			const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || new Array(10).fill(null);
			const existingBookmark = bookmarks[i];

			if (existingBookmark && existingBookmark.uri === bookmark.uri && existingBookmark.line === bookmark.line) {
				// Remove bookmark if it already exists
				bookmarks[i] = null;
				vscode.window.showInformationMessage(`Removed bookmark ${i}`);
			} else {
				// Add new bookmark
				bookmarks[i] = bookmark;
				vscode.window.showInformationMessage(`Added bookmark ${i} → ${doc.fileName}:${pos.line + 1}`);
			}

			await state.update(STORAGE_KEY, bookmarks);
			await refreshDecorations(state); // Update gutter icon state
		});

		context.subscriptions.push(toggleDisposable);
	}

	// List bookmarks
	const listDisposable = vscode.commands.registerCommand('numberedBookmarks.list', async () => {
		const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || new Array(10).fill(null);
		const items = bookmarks.map((b, idx) => ({
			label: `${idx}`,
			description: b ? `${vscode.Uri.parse(b.uri).fsPath}:${b.line + 1}` : '—'
		}));
		const pick = await vscode.window.showQuickPick(items, { placeHolder: 'Numbered bookmarks' });
		if (!pick) return;
		const idx = Number(pick.label);
		await vscode.commands.executeCommand(`numberedBookmarks.goto${idx}`);
	});
	context.subscriptions.push(listDisposable);

	// Refresh decorations on editor change
	vscode.window.onDidChangeActiveTextEditor(() => refreshDecorations(state), null, context.subscriptions);
	vscode.workspace.onDidChangeTextDocument(() => refreshDecorations(state), null, context.subscriptions);

	// Initial refresh
	refreshDecorations(state);
}

async function refreshDecorations(state: vscode.Memento) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || [];
	for (let i = 0; i <= 9; i++) {
		const bm = bookmarks[i];
		if (bm && bm.uri === editor.document.uri.toString()) {
			const pos = new vscode.Position(bm.line, 0);
			editor.setDecorations(decorations[i], [{ range: new vscode.Range(pos, pos) }]);
		} else {
			// Remove decoration if not present
			editor.setDecorations(decorations[i], []);
		}
	}
}

export function deactivate() { }
