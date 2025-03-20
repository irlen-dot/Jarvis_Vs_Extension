import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './protos/text_into_commands';
import { TextToCommandsResponse } from "./protos/text_to_commands/TextToCommandsResponse";
import { TextToCommandsRequest } from "./protos/text_to_commands/TextToCommandsRequest";

const PORT = 50051;

const PROTO_PATH = 'C:/Users/irlen/Documents/projects/AI/MAIN_JARVIS_ROOT/jarvis/src/protos/text_into_commands.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
const textToCommandsPackage = grpcObject.text_to_commands.TextToCommands;



export const textIntoCommandsClient = new textToCommandsPackage(
  `localhost:${PORT}`,
  grpc.credentials.createInsecure()
);


export function convertTextToCommands(text: string) {
  const request: TextToCommandsRequest = {
    text: text,
  };

  textIntoCommandsClient.ConvertTextToCommands(request, (err: any, response: any) => {
    if (err) {
      console.error('Failed to convert text to commands: ' + err);
      return;
    }
    console.log('Response:', response);
  });
}