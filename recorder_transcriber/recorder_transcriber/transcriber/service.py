import subprocess

class TranscriberService:
    def __init__(self):
        self.sample_rate = 44100

    def transcribe_audio(self, audio_file_path):
        """
        Transcribes audio from a WAV file to text using Whisper CLI.
        
        Args:
            audio_file_path (str): Path to the WAV file to transcribe
            
        Returns:
            str: The transcribed text
        """
        try:
            # Run whisper command and capture output
            result = subprocess.run(
                ["whisper", audio_file_path, "--model", "tiny"],
                capture_output=True,
                text=True,
                check=True
            )
            # The transcription is typically in stdout
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"Whisper transcription failed: {e.stderr}")
