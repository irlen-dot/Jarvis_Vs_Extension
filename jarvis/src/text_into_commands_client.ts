import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './protos/text_into_commands';
import { TextToCommandsResponse, TextToCommandsResponse__Output } from "./protos/text_to_commands/TextToCommandsResponse";
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


// Parse a string like "\ncursor_movement_to_line5" into a structured command
function parseCommandString(commandStr: string) {
  // Remove any leading/trailing whitespace or newlines
  const cleaned = commandStr.trim();

  // Use regex to extract the type and value
  // This pattern looks for letters/underscores (type) followed by digits (value)
  const match = cleaned.match(/([a-z_]+)(\d+)/i);

  if (match) {
    return {
      type: match[1],
      value: match[2],
      date: null
    };
  }

  // If no match, return the original as type with empty value
  return {
    type: cleaned,
    value: '',
    date: null
  };
}

export type Commands = TextToCommandsResponse__Output['commands'];

export function convertTextToCommands(text: string): Promise<Commands> {
  const request: TextToCommandsRequest = {
    text: text,
  };

  return new Promise((resolve, reject) => {
    textIntoCommandsClient.ConvertTextToCommands(request, (err: any, response: TextToCommandsResponse__Output | undefined) => {
      if (err) {
        console.error('Failed to convert text to commands: ' + err);
        reject(err);
        return;
      }
      if (!response) {
        reject(new Error('No response from server'));
        return;
      }
      resolve(response!.commands);
    });
  });
}