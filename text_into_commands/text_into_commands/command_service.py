from langchain.tools import tool


# Global commands list
commands = []


def _add_command(command_type, command_value, command_date=None):
    print(
        f"Adding command - Type: {command_type}, Value: {command_value}, Date: {command_date}"
    )
    command = {"type": command_type, "value": command_value, "date": command_date}
    commands.append(command)
    print(f"Command added successfully. Current commands: {commands}")


@tool
def move_cursor_to_line(line_number):
    """Moves the cursor to the specified line number in the editor.

    Args:
        line_number: The line number to move the cursor to

    Returns:
        str: A confirmation message that the cursor was moved
    """
    print(f"Moving cursor to line {line_number}")
    command = {
        "type": "cursor_movement_to_line",
        "value": str(line_number),
        "date": None,
    }
    commands.append(command)
    print(f"Cursor movement command added. Current commands: {commands}")
    return f"Cursor moved to line {line_number}"


def get_commands():
    print(f"Retrieving commands: {commands}")
    return commands


def clear_commands():
    print("Clearing all commands")
    global commands
    commands = []
    print("Commands cleared successfully")
