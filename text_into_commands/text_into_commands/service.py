from dotenv import load_dotenv
import grpc
from protos import text_into_commands_pb2_grpc
from protos import text_into_commands_pb2
from langchain.agents import AgentExecutor, create_react_agent
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.tools import Tool

load_dotenv()

class TextToCommandsController(text_into_commands_pb2_grpc.TextToCommandsServicer):
    def __init__(self):        
        llm = OpenAI(temperature=0)
        prompt = PromptTemplate.from_template(
            "Given the text input, convert it into a sequence of commands. {text}"
        )
        
        tools = [
            Tool(
                name="Command Generator",
                func=lambda x: ["command1", "command2"],  # Replace with actual command generation
                description="Converts text into a sequence of commands"
            )
        ]
        
        self.agent = create_react_agent(llm=llm, tools=tools, prompt=prompt)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=tools, verbose=True)
    
    def ConvertTextToCommands(self, request, context):
        # Implement your logic here
        # For example:
        try:
            # Process the request.text and convert it to commands
            commands = ["your", "processed", "commands"]
            
            return text_into_commands_pb2.TextToCommandsResponse(
                commands=commands,
                success=True
            )
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return text_into_commands_pb2.TextToCommandsResponse(
                commands=[],
                success=False
            )