from concurrent import futures
import grpc
# from flask import Flask, request, Response
from protos import text_into_commands_pb2_grpc
# from protos.text_into_commands_pb2_grpc import TextToCommandsServicer
from text_into_commands.controller import TextToCommandsController


# TextToCommandsServicer.ConvertTextToCommands()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    text_into_commands_pb2_grpc.add_TextToCommandsServicer_to_server(
        TextToCommandsController(), server
    )
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Microservice started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
