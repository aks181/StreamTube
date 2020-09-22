import React from 'react';

class GoogleAuth extends React.Component {

    state= {
        loggedIn: null
    }
    
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
                this.setState({ loggedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    //helper function to listen to auth status & change login status without refresh
    onAuthChange = () => {
        this.setState({ loggedIn: this.auth.isSignedIn.get() });
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {        
        
        if(this.state.loggedIn === null) {
            return null;
        } else if (this.state.loggedIn) {
            return (
                <button onClick= {this.onSignOut} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick= {this.onSignIn} className="ui red google button">
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

export default GoogleAuth;
