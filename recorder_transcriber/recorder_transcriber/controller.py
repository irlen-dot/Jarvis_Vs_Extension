import os
import grpc
import sounddevice as sd
from scipy.io import wavfile
import numpy as np
from protos import record_transcriber_pb2_grpc, record_transcriber_pb2
from recorder_transcriber.transcriber.service import TranscriberService


class RecordTranscriberController(
    record_transcriber_pb2_grpc.RecordTranscriberServicer
):

    def RecordAndTranscribe(self, request, context):
        try:
            # Configure audio recording settings
            sample_rate = 44100
            channels = 2
            duration = 5

            # Record audio
            recording = sd.rec(
                int(sample_rate * duration), samplerate=sample_rate, channels=channels
            )
            sd.wait()

            # Convert to 16-bit integer format
            recording = (recording * np.iinfo(np.int16).max).astype(np.int16)

            # Save recording to WAV file
            output_path = f"assets/{np.random.randint(10000, 99999)}_audio.wav"
            wavfile.write(output_path, sample_rate, recording)

            # Transcribe the audio
            transcriber = TranscriberService()
            transcribed_text = transcriber.transcribe_audio(output_path)

            # Delete the WAV file
            os.remove(output_path)

            # Return response
            return record_transcriber_pb2.RecordAndTranscribeResponse(
                transcribed_text=transcribed_text,
                confidence_score=100.0,
                error_message="",
            )

        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return record_transcriber_pb2.RecordAndTranscribeResponse(
                status="error", message=str(e)
            )
