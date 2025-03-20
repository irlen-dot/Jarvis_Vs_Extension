from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI

from text_into_commands.command_service import (
    clear_commands,
    get_commands,
    move_cursor_to_line,
)

load_dotenv()


class Agent:
    def __init__(self):
        llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
        tools = [move_cursor_to_line]
        prompt = PromptTemplate.from_template(
            """You are an assistant that helps convert user text input into commands.
        
            Your goal is to understand what the user wants to do and convert their request into appropriate commands using the available tools.

            For example, if they say "go to line 5", you would use the move_cursor_to_line tool to move the cursor there.

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

            Think through what commands would best accomplish what the user is asking for."""
        )
        self.agent = create_tool_calling_agent(llm=llm, tools=tools, prompt=prompt)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=tools, verbose=True)

    def execute(self, text):
        print("Invoking agent...")
        self.agent_executor.invoke({"text": text})
        print("Agent executed.")
        commands = get_commands()
        print("Commands: ", commands)
        clear_commands()
        return commands
