import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './protos/record_transcriber';
import { Empty } from './protos/record_transcriber/Empty';

const PORT = 50052;

const PROTO_PATH = 'C:/Users/irlen/Documents/projects/AI/MAIN_JARVIS_ROOT/jarvis/src/protos/record_transcriber.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
const recordTranscriberPackage = grpcObject.record_transcriber;

export const recordTranscriberClient = new recordTranscriberPackage.RecordTranscriber(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure()
);

export function recordAndTranscribe(): Promise<string> {
    return new Promise((resolve, reject) => {
        const request: Empty = {};

        recordTranscriberClient.RecordAndTranscribe(request, (err: any, response: any) => {
            if (err) {
                console.error('Failed to record and transcribe: ' + err);
                reject(err);
                return;
            }
            console.log("Response from record and transcribe: ", response);
            resolve(response.transcribed_text);
        });
    });
}
