import React from 'react';
import { signInAction , signOutAction } from '../actions';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {

    componentDidMount() {
        //after additional client:auth2 module is successfully loaded up,
        //callback described gets invoked
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({   //async rquest to google api server to initialize our client
                clientId: '903823685612-cv5b31j11a3m937j1m2pg5dhri1aq8bu.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=> {          //init returns a promise , we dont need a callback function like with load
                //we need an arrow function that gets invoked after library has successfully initialized
                this.auth = window.gapi.auth2.getAuthInstance(); //this.auth is the auth instance
                this.onAuthChange(this.auth.isSignedIn.get());  //runs at initialization of lib to display state
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    //helper function to listen to auth status & change login status without refresh
    //this function is actually called with a boolean argument, so refactoring
    onAuthChange = (isLoggedIn) => {
        if(isLoggedIn) {
            this.props.signInAction(this.auth.currentUser.get().getId());    //calling our action creators
        } else {
            this.props.signOutAction();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {        
        
        if(this.props.isLoggedIn === null) {
            return null;
        } else if (this.props.isLoggedIn) {
            return (
                <button onClick= {this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick= {this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isLoggedIn: state.authRed.loggedIn }
}

export default connect(mapStateToProps, {
    signInAction, signOutAction
})(GoogleAuth);
