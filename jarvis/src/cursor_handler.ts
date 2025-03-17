import * as vscode from 'vscode';

export async function moveCursorToLine(lineNum: number) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    vscode.window.showInformationMessage(`moveCursorToLine`);

    // Get the position at the start of the specified line
    const position = new vscode.Position(lineNum - 1, 0);

    // Move cursor to that position
    editor.selection = new vscode.Selection(position, position);

    // Reveal the line in the editor
    editor.revealRange(new vscode.Range(position, position));
}