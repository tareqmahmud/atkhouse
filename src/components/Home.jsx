import React, {Component, useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from './firebase';

import AudioAnalyzer from './AudioAnalyzer';
import Microphone from './Microphone';
import Light from './Light';
import Switch from './Switch';
import ThemeProvider from '../context/ThemeContext';
import {matchLightActionFromVoice} from '../utils/speechToText';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: null
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
        this.startListening = this.startListening.bind(this);
        this.stopListening = this.stopListening.bind(this);
        this.stopMicrophone = this.stopMicrophone.bind(this);
        this.getMicrophone = this.getMicrophone.bind(this);
        this.recognition = null;
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({audio});
    }

    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.recognition = null;
        const audioTranscript = document.getElementById('audioTranscript');
        audioTranscript.innerText = null;
        this.setState({audio: null});
    }

    stopListening() {
        const audioTranscript = document.getElementById('audioTranscript');
        audioTranscript.innerText = null;
    }

    toggleMicrophone() {
        this.state.audio ? this.stopMicrophone() : this.getMicrophone();
    }

    async startListening() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({audio});

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript);
            const audioTranscript = document.getElementById('audioTranscript');
            audioTranscript.innerText = transcript[0];

            if (e.results[0].isFinal) {
                let lightStatus = matchLightActionFromVoice(transcript[0]);
                console.log(transcript[0]);

                if (lightStatus === true) {
                    firebase.firestore().collection('LEDStatus').doc('rycUkHyKsUl0NnS0Ocxi').update({
                        'light_status': true
                    });
                } else if (lightStatus === false) {
                    firebase.firestore().collection('LEDStatus').doc('rycUkHyKsUl0NnS0Ocxi').update({
                        'light_status': false
                    });
                }
            }
        });
        this.recognition.start();
        this.recognition.addEventListener('end', this.recognition.start);
    }

    render() {
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
                                            <Microphone audio={this.state.audio}
                                                        startListening={this.startListening}
                                                        toggleMicrophone={this.toggleMicrophone}
                                                        stopListening={this.stopListening}
                                                        stopMicrophone={this.stopMicrophone}
                                                        getMicrophone={this.getMicrophone}/>
                                            <h4 className="text-center mt-5" id="audioTranscript"/>
                                            {this.state.audio ? <AudioAnalyzer audio={this.state.audio}/> : ''}
                                        </div>

                                    </div>
                                    {/*{this.state.audio && <div className="card-footer text-center">*/}
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
}
