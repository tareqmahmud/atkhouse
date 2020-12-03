import React, {useContext} from 'react'; // add {useCallback, useContext}
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AuthContext} from '../../context/AuthContext';
import firebase from '../../config/firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Snackbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Copyright from '../Layout/Copyright';


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
export default function UserAuthId({history}) {
    const [open, setOpen] = React.useState(false);
    const context = useContext(AuthContext);
    const currentUserId = context.currentUser.uid;
    const classes = useStyles();

    const handleFocus = (event) => {
        event.target.select();
        document.execCommand('copy');
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
                    <Button color="inherit" onClick={() => firebase.auth().signOut()}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <TextField
                        id="outlined-read-only-input"
                        label="User Auth ID"
                        fullWidth
                        defaultValue={currentUserId}
                        onFocus={handleFocus}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                        message="User authenticated id successfully copy to your clipboard"
                        action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        }
                    />
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </div>
    );
}