import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/Signup/Signup';
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './route/PrivateRoute';
import AddPIKey from './components/RPI/AddPIKey';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/add-pi-key" component={AddPIKey}/>
                    <Route exact path="/signin" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;