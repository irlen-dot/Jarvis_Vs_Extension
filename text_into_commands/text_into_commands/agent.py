import langchain 
from langchain.agents import AgentExecutor, create_react_agent

class Agent:
    def __init__(self):
        self.commands = []

    def add_command(self, command):
        self.commands.append(command)

