// Original file: ../protos/record_transcriber.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _record_transcriber_Empty, Empty__Output as _record_transcriber_Empty__Output } from './Empty';
import type { RecordAndTranscribeResponse as _record_transcriber_RecordAndTranscribeResponse, RecordAndTranscribeResponse__Output as _record_transcriber_RecordAndTranscribeResponse__Output } from './RecordAndTranscribeResponse';

export interface RecordTranscriberClient extends grpc.Client {
  RecordAndTranscribe(argument: _record_transcriber_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  RecordAndTranscribe(argument: _record_transcriber_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  RecordAndTranscribe(argument: _record_transcriber_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  RecordAndTranscribe(argument: _record_transcriber_Empty, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  recordAndTranscribe(argument: _record_transcriber_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  recordAndTranscribe(argument: _record_transcriber_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  recordAndTranscribe(argument: _record_transcriber_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;
  recordAndTranscribe(argument: _record_transcriber_Empty, callback: grpc.requestCallback<_record_transcriber_RecordAndTranscribeResponse__Output>): grpc.ClientUnaryCall;

}

export interface RecordTranscriberHandlers extends grpc.UntypedServiceImplementation {
  RecordAndTranscribe: grpc.handleUnaryCall<_record_transcriber_Empty__Output, _record_transcriber_RecordAndTranscribeResponse>;

}

export interface RecordTranscriberDefinition extends grpc.ServiceDefinition {
  RecordAndTranscribe: MethodDefinition<_record_transcriber_Empty, _record_transcriber_RecordAndTranscribeResponse, _record_transcriber_Empty__Output, _record_transcriber_RecordAndTranscribeResponse__Output>
}
