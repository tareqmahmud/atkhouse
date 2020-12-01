import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Register';
import {AuthProvider} from './components/Authentication';
import PrivateRoute from './components/PrivateRoute';
import AddPIKey from './components/AddPIKey';
import Home2 from './components/Home2';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/add-pi-key" component={AddPIKey}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/audio" component={Home2}/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;