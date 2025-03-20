from dotenv import load_dotenv
import grpc
from protos import text_into_commands_pb2_grpc
from protos import text_into_commands_pb2
from langchain.agents import AgentExecutor, create_react_agent
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.tools import Tool

from text_into_commands.agent import Agent

load_dotenv()


class TextToCommandsController(text_into_commands_pb2_grpc.TextToCommandsServicer):
    def __init__(self):
        llm = OpenAI(temperature=0)
        self.agent = Agent()

    def ConvertTextToCommands(self, request, context):
        # Implement your logic here
        # For example:
        # Process the request.text and convert it to commands
        commands = self.agent.execute(request.text)
        print(commands)
        return text_into_commands_pb2.TextToCommandsResponse(
            commands=commands,
            # success=True
        )
