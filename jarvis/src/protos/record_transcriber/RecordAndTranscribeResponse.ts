// Original file: ../protos/record_transcriber.proto


export interface RecordAndTranscribeResponse {
  'transcribedText'?: (string);
  'confidenceScore'?: (number | string);
  'errorMessage'?: (string);
}

export interface RecordAndTranscribeResponse__Output {
  'transcribedText'?: (string);
  'confidenceScore'?: (number);
  'errorMessage'?: (string);
}
