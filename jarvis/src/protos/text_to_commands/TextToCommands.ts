// Original file: ../protos/text_into_commands.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { TextToCommandsRequest as _text_to_commands_TextToCommandsRequest, TextToCommandsRequest__Output as _text_to_commands_TextToCommandsRequest__Output } from '../text_to_commands/TextToCommandsRequest';
import type { TextToCommandsResponse as _text_to_commands_TextToCommandsResponse, TextToCommandsResponse__Output as _text_to_commands_TextToCommandsResponse__Output } from '../text_to_commands/TextToCommandsResponse';

export interface TextToCommandsClient extends grpc.Client {
  ConvertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  ConvertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  ConvertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  ConvertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  convertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  convertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  convertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  convertTextToCommands(argument: _text_to_commands_TextToCommandsRequest, callback: grpc.requestCallback<_text_to_commands_TextToCommandsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TextToCommandsHandlers extends grpc.UntypedServiceImplementation {
  ConvertTextToCommands: grpc.handleUnaryCall<_text_to_commands_TextToCommandsRequest__Output, _text_to_commands_TextToCommandsResponse>;
  
}

export interface TextToCommandsDefinition extends grpc.ServiceDefinition {
  ConvertTextToCommands: MethodDefinition<_text_to_commands_TextToCommandsRequest, _text_to_commands_TextToCommandsResponse, _text_to_commands_TextToCommandsRequest__Output, _text_to_commands_TextToCommandsResponse__Output>
}
