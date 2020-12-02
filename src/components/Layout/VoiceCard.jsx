import React from 'react';
// Import bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import Microphone from '../Audio/Microphone';
import AudioAnalyzer from '../Audio/AudioAnalyzer';

const VoiceCard = (props) => {
    return (
        <div className="col-md-6 mt-4">
            <div className="card">
                <div className="card-header text-center">
                    <h4>ATKHouse - Voice Assistant</h4>
                </div>
                <div className="card-body">
                    <div className="App">
                        <Microphone
                            audioStatus={props.audioStatus}
                            startListening={props.startListening}
                            stopListening={props.stopListening}/>
                        <h4 className="text-center mt-5" id="audioTranscript">{props.transcript}</h4>
                        {props.audio ? <AudioAnalyzer audio={props.audio}/> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoiceCard;