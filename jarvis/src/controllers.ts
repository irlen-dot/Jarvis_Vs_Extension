
import * as vscode from 'vscode';
import { Instructions } from './server';
import { moveCursorToLine } from './cursor_handler';

export async function handleInstruction(instruction: Instructions): Promise<void> {
    switch (instruction.type) {
        case 'cursor_movement_to_line':
            if (typeof instruction.value === 'number') {
                await moveCursorToLine(instruction.value);
            }
            break;
        default:
            console.error(`Unknown command: ${instruction.type}`);
    }
}
