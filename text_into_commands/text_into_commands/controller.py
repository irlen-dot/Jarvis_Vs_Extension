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
        self.agent = Agent()

    def ConvertTextToCommands(self, request, context):
        # Implement your logic here
        # For example:
        # Process the request.text and convert it to commands
        response = text_into_commands_pb2.TextToCommandsResponse()
        raw_commands = self.agent.execute(request.text)
        commands = []

        for cmd in raw_commands:
            commands.append(
                text_into_commands_pb2.Command(
                    type=cmd["type"], value=cmd["value"], date=cmd["date"]
                )
            )

        response.commands.extend(commands)

        print("Response commands: ", response.commands)

        return response
