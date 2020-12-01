import React, {Component, useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from './firebase';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import Light from './Light';
import Switch from './Switch';
import Microphone from './Microphone';
import AudioAnalyzer from './AudioAnalyzer';
import ThemeProvider from '../context/ThemeContext';


const Home2 = () => {
    const [audio, setAudio] = useState(null);
    const [audioStatus, setAudioStatus] = useState(null);

    const commands = [
        {
            command: '*',
            callback: (speech) => {
                if (speech) {
                    resetTranscript();
                    setAudioStatus(false);
                    setAudio(false);
                }
            }
        }
    ]

    const {transcript, resetTranscript} = useSpeechRecognition({commands});

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const startListening = async () => {
        SpeechRecognition.startListening();
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
        setAudioStatus(true);
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setAudio(null);
        setAudioStatus(false);
        resetTranscript();
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        ATKHouse - The ultimate Smart Home
                    </Typography>
                    <Button color="inherit" onClick={() => firebase.auth().signOut()}>Logout</Button>
                </Toolbar>
            </AppBar>

            <ThemeProvider>
                <div className="container">
                    <div className="App row">
                        <div className="col-md-6 mt-4">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h4>TKR Smart House</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <Light/>
                                        <Switch/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mt-4">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h4>Voice Assistant</h4>
                                </div>
                                <div className="card-body">
                                    <div className="App">
                                        <Microphone
                                            audioStatus={audioStatus}
                                            startListening={startListening}
                                            stopListening={stopListening}/>
                                        <h4 className="text-center mt-5" id="audioTranscript">{transcript}</h4>
                                        {audio ? <AudioAnalyzer audio={audio}/> : ''}
                                    </div>

                                </div>
                                {/*{audio && <div className="card-footer text-center">*/}
                                {/*    <h4>Listening....</h4>*/}
                                {/*</div>}*/}
                            </div>
                        </div>

                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Home2;