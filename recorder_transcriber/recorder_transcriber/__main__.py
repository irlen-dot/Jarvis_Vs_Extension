from concurrent import futures
import grpc
from recorder_transcriber.controller import RecordTranscriberController
from protos import record_transcriber_pb2_grpc


if __name__ == "__main__":
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    record_transcriber_pb2_grpc.add_RecordTranscriberServicer_to_server(
        RecordTranscriberController(), server
    )
    server.add_insecure_port("[::]:50052")
    server.start()
    print("Microservice started on port 50052")
    server.wait_for_termination()
