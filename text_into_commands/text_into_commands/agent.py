from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI

from text_into_commands.command_service import (
    clear_commands,
    get_commands,
    move_cursor_to_line,
    write_code,
)

load_dotenv()


class Agent:
    def __init__(self):
        llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
        tools = [move_cursor_to_line, write_code]
        prompt = PromptTemplate.from_template(
            """
            Your goal is to understand what the user wants to do and convert their request into appropriate commands using the available tools.

            For example, if they say "go to the third line", you would use the move_cursor_to_line tool to move the cursor there.
            If they say "go to the third line and write a function for printing 'Hello, world!'", you would use the move_cursor_to_line and write_code tools.
            IMPORTANT: Avoid using the same tool with the same arguments multiple times, as this creates redundant actions.

            Available Tools: {{tools}}

            Tool Descriptions: {{tool_descriptions}}

            User input: {text}

            To approach this task, use the following format:
            Thought: First, think about what needs to be done
            Action: Then, choose a tool to use in the format "tool_name" with appropriate "arguments"
            Observation: Review the result
            ... (continue this thought/action/observation cycle if needed)
            Thought: Finally, when you have completed the task, explain why you're done
            Final Answer: Summarize the actions taken

            {agent_scratchpad}

            Think through what commands would best accomplish what the user is asking for. Remember to avoid duplicate actions."""
        )
        self.agent = create_tool_calling_agent(llm=llm, tools=tools, prompt=prompt)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=tools, verbose=True)
        self.executed_actions = set()  # Track executed actions

    def execute(self, text):
        print("Invoking agent...")
        self.executed_actions.clear()  # Clear previous actions
        print("Executing agent...")
        self.agent_executor.invoke({"text": text})
        print("Agent executed.")
        commands = get_commands()
        # Remove duplicate commands while preserving order
        unique_commands = []
        seen = set()
        for cmd in commands:
            cmd_tuple = tuple(cmd.items())  # Convert dict to hashable type
            if cmd_tuple not in seen:
                seen.add(cmd_tuple)
                unique_commands.append(cmd)
        print("Commands: ", unique_commands)
        clear_commands()
        return unique_commands
