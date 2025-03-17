// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import 
import Express from 'express';
import { startServer } from './server';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jarvis" is now active!');

	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('jarvis.listen', () => {
		// Get port from VS Code settings, fallback to 3000 if not set
		const config = vscode.workspace.getConfiguration('jarvis');
		const port = config.get('serverPort', 3000); // 3000 is the default value
		
		startServer(port);
		
		vscode.window.showInformationMessage(`Server started on port ${port}`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
