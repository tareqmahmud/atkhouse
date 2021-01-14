import React, {useContext, useState} from 'react';
import firebase from '../config/firebase';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import ThemeProvider from '../context/ThemeContext';
import {matchLightActionFromVoice} from '../utils/speechToText';
import {AuthContext} from '../context/AuthContext';
import RootContainer from './Layout/RootContainer';


const Home = () => {
    const [audio, setAudio] = useState(null);
    const [audioStatus, setAudioStatus] = useState(null);
    const context = useContext(AuthContext);
    const currentUserId = context.currentUser.uid;

    // Trigger commands after command has been trigger
    const commands = [
        {
            command: '*',
            callback: async (speech) => {
                if (speech) {
                    const firebaseDatabase = firebase.database().ref('/LedStatus');

                    let lightStatus = matchLightActionFromVoice(speech);

                    if (lightStatus === true) {
                        await firebaseDatabase.child(currentUserId).update({
                            'light_status': true
                        });
                    } else if (lightStatus === false) {
                        await firebaseDatabase.child(currentUserId).update({
                            'light_status': false
                        });
                    }
                    resetTranscript();
                }
            }
        }
    ]

    // Instance of speech recognition
    const {transcript, resetTranscript} = useSpeechRecognition({commands});

    /**
     * Check is browser support WebSpeech or not
     */
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    /**
     * Method for stop listening
     *
     * @returns {Promise<void>}
     */
    const startListening = async () => {
        SpeechRecognition.startListening({
            continuous: true
        });
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
        setAudioStatus(true);
    }

    /**
     * Method to stop listening
     */
    const stopListening = async () => {
        SpeechRecognition.stopListening();
        setAudio(null);
        setAudioStatus(false);
        resetTranscript();
    }

    return (
        <RootContainer>
            <ThemeProvider>
                <div className="container">
                    <div className="App row">
                        <h2 style={{textAlign: 'center'}}>Welcome to dashboard</h2>
                    </div>
                </div>
            </ThemeProvider>
        </RootContainer>
    );
}

export default Home;