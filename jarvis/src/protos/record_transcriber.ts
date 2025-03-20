import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RecordTranscriberClient as _record_transcriber_RecordTranscriberClient, RecordTranscriberDefinition as _record_transcriber_RecordTranscriberDefinition } from './record_transcriber/RecordTranscriber';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  record_transcriber: {
    Empty: MessageTypeDefinition
    RecordAndTranscribeResponse: MessageTypeDefinition
    RecordTranscriber: SubtypeConstructor<typeof grpc.Client, _record_transcriber_RecordTranscriberClient> & { service: _record_transcriber_RecordTranscriberDefinition }
  }
}

