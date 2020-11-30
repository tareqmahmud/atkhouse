import React, {useCallback, useContext, useEffect, useState} from 'react'; // add {useCallback, useContext}
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter, Redirect} from 'react-router';
import app from './firebase.js';
import {AuthContext} from './Authentication';
import firebase from './firebase';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="https://tareqmahmud.com">
                ATKHouse
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function AddPIKey({history}) {
    const [userData, setUserData] = useState(null);
    const [rpiKey, setRPIKey] = useState();
    const context = useContext(AuthContext);
    const currentUserId = context.currentUser.uid;

    useEffect(() => {
        firebase.database().ref('/LedStatus/' + currentUserId).on('value', snapshot => {
            const userRPIData = [];
            snapshot.forEach(snap => {
                userRPIData.push(snap.val());
            });

            setUserData(userRPIData);
        })
    }, []);

    const handleRPIInputKey = (event) => {
        event.preventDefault();

        const value = event.target.value;

        setRPIKey(event.target.value);
    };

    const handleAddPIKey = async (event) => {
        event.preventDefault();

        // RPI Key Form Validation
        if (!rpiKey || (rpiKey && rpiKey.trim() === '')) {
            setRPIKey(null);
            return;
        }

        const firebaseDatabase = firebase.database().ref('/LedStatus');

        if (userData !== null) {
            if (userData.length > 0) {
                await firebaseDatabase.child(currentUserId).update({
                    'rpiKey': rpiKey
                })
            } else {
                await firebaseDatabase.child(currentUserId).set({
                    'rpiKey': rpiKey
                })
            }

            console.log('Success');
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ATKHouse - The ultimate Smart Home
                    </Typography>
                    <Button color="inherit" onClick={() => app.auth().signOut()}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        RPI Unique Key
                    </Typography>
                    <form onSubmit={handleAddPIKey} className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            id="rpiKey"
                            label="Please enter RaspberryPi Key"
                            name="rpiKey"
                            onChange={handleRPIInputKey}
                            error={rpiKey === null || rpiKey === ''}
                            helperText={rpiKey === null || rpiKey === '' ? 'Please Add RPI unique key' : ' '}
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add Key
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </div>
    );
}