
import * as vscode from 'vscode';

import { moveCursorToLine } from './cursor_handler';
import { Commands } from './text_into_commands_client';

export async function handleCommands(commands: Commands): Promise<void> {
    console.log("[Handle commands] commands:", commands);
    if (!commands) {
        console.error('No commands provided');
        return;
    }
    for (const command of commands) {
        switch (command.type) {
            case 'cursor_movement_to_line':
                if (!command.value) throw '';
                await moveCursorToLine(parseInt(command.value!));
                break;
            default:
                console.error(`Unknown command: ${command.type}`);
        }
    }
}
