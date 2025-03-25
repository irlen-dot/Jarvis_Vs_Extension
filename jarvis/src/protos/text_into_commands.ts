import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TextToCommandsClient as _text_to_commands_TextToCommandsClient, TextToCommandsDefinition as _text_to_commands_TextToCommandsDefinition } from './text_to_commands/TextToCommands';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  text_to_commands: {
    Command: MessageTypeDefinition
    TextToCommands: SubtypeConstructor<typeof grpc.Client, _text_to_commands_TextToCommandsClient> & { service: _text_to_commands_TextToCommandsDefinition }
    TextToCommandsRequest: MessageTypeDefinition
    TextToCommandsResponse: MessageTypeDefinition
  }
}

