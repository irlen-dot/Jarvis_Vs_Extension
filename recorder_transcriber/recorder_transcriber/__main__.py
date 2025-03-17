from flask import Flask
import sounddevice as sd
from scipy.io import wavfile
import numpy as np
from recorder_transcriber.transcriber.service import TranscriberService

app = Flask(__name__) 

@app.route('/')
def index():
    return 'Welcome to the Recorder Transcriber'

@app.route('/start-recording', methods=['GET'])
def start_recording():
    sample_rate = 44100
    
    try:
        # Configure audio settings
        channels = 2
        duration = 5

        # Start recording
        myrecording = sd.rec(int(sample_rate * duration), samplerate=sample_rate, channels=channels)
        sd.wait()
        
        # Save the recording as WAV file
        # Convert to 16-bit integer format which is standard for WAV files
        myrecording = (myrecording * np.iinfo(np.int16).max).astype(np.int16)

        output_path = f'assets/{np.random.randint(10000, 99999)}_audio.wav'
        wavfile.write(output_path, sample_rate, myrecording)

        transcriber = TranscriberService()
        transcribed_text = transcriber.transcribe_audio(output_path)
        
        return {'status': 'success', 'message': transcribed_text }, 200
    except Exception as e:
        return {'status': 'error', 'message': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)
