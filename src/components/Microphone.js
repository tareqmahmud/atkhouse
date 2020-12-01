import React from 'react';
import '../styles/Microphone.css';
import MicrophoneOff from '../images/MicrophoneOff.svg';
import MicrophoneOn from '../images/MicrophoneOn.svg';

const Microphone = (props) => {
    return (
        <div className="google-microphone">
            {props.audioStatus ? <img src={MicrophoneOn} alt="Microphone On"
                                onClick={props.stopListening}/>
                : <img src={MicrophoneOff} alt="Microphone Off" onClick={props.startListening}/>}
        </div>
    )
};

export default Microphone;