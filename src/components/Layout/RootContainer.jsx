import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from '../../config/firebase';
import Copyright from './Copyright';
import {AuthContext} from '../../context/AuthContext';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    mainTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '10px'
    },
    homeIcon: {
        fontSize: '50px',
        marginRight: '5px'
    }
}));

const RootContainer = (props) => {
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext);

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                        {/*    <MenuIcon/>*/}
                        {/*</IconButton>*/}
                        <Typography variant="h6" className={classes.title}>
                            <div className={classes.mainTitle}>
                                <HomeWorkIcon className={classes.homeIcon} />{" "}
                                IoT Home Automation System - Southeast
                                University
                            </div>
                        </Typography>
                        {currentUser && (
                            <Button
                                color="inherit"
                                onClick={() => firebase.auth().signOut()}
                            >
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>

                {props.children}
            </div>

            <Copyright />
        </>
    );
};

export default RootContainer;