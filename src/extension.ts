import * as vscode from 'vscode';


type Bookmark = { uri: string; line: number; character: number };


const STORAGE_KEY = 'numberedBookmarks';


export function activate(context: vscode.ExtensionContext) {
	const state = context.workspaceState;


	// Ensure storage shape exists
	if (!state.get(STORAGE_KEY)) {
		const empty: (Bookmark | null)[] = new Array(10).fill(null);
		state.update(STORAGE_KEY, empty);
	}


	// Register commands for 0..9
	for (let i = 0; i <= 9; i++) {
		const addCmd = `numberedBookmarks.add${i}`;
		const gotoCmd = `numberedBookmarks.goto${i}`;


		const addDisposable = vscode.commands.registerCommand(addCmd, async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showWarningMessage('No active editor to add a bookmark.');
				return;
			}
			const doc = editor.document;
			const pos = editor.selection.active;
			const bookmark: Bookmark = { uri: doc.uri.toString(), line: pos.line, character: pos.character };


			const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || new Array(10).fill(null);
			bookmarks[i] = bookmark;
			await state.update(STORAGE_KEY, bookmarks);


			vscode.window.showInformationMessage(`Added bookmark ${i} → ${doc.fileName}:${pos.line + 1}:${pos.character + 1}`);
		});


		const gotoDisposable = vscode.commands.registerCommand(gotoCmd, async () => {
			const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || new Array(10).fill(null);
			const bm = bookmarks[i];
			if (!bm) {
				vscode.window.showWarningMessage(`No bookmark set for ${i}.`);
				return;
			}
			try {
				const uri = vscode.Uri.parse(bm.uri);
				const doc = await vscode.workspace.openTextDocument(uri);
				const editor = await vscode.window.showTextDocument(doc);
				const pos = new vscode.Position(bm.line, Math.max(0, bm.character));
				editor.selection = new vscode.Selection(pos, pos);
				editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
			} catch (err) {
				vscode.window.showErrorMessage(`Failed to open bookmark ${i}: ${String(err)}`);
			}
		});


		context.subscriptions.push(addDisposable, gotoDisposable);
	}


	// Utility commands
	const listDisposable = vscode.commands.registerCommand('numberedBookmarks.list', async () => {
		const bookmarks = (state.get(STORAGE_KEY) as (Bookmark | null)[]) || new Array(10).fill(null);
		const items = bookmarks.map((b, idx) => ({ label: `${idx}`, description: b ? `${vscode.Uri.parse(b.uri).fsPath}:${b.line + 1}` : '—' }));
		const pick = await vscode.window.showQuickPick(items, { placeHolder: 'Numbered bookmarks' });
		if (!pick) return;
		const idx = Number(pick.label);
		vscode.commands.executeCommand(`numberedBookmarks.goto${idx}`);
	});
	context.subscriptions.push(listDisposable);
}


export function deactivate() { }