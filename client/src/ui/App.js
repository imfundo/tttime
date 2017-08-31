import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Link } from 'react-router-dom'

import Login from './Login'
import TimelogList from './TimelogList'
import CreateTimelog from './CreateTimelog'
import EditTimelog from './EditTimelog'
import Loader from './Loader'



class App extends Component {

    state = {
        storageClientLoaded: false,
        userSignedIn: false,
        timelogs: null,
    }

    componentWillMount() {
        const { storage } = this.props;
        storage.init().then(() => {
            this.setState({ storageClientLoaded: true });
            this.handleSigninUpdate(storage.isSignedIn());
            storage.listen(this.handleSigninUpdate);
        });
    }

    fetchTimelogs() {
        this.props.storage.getTimeLogs().then(timelogs => {
            this.setState({ timelogs });
        })
    }

    handleSigninUpdate = (userSignedIn) => {
        const { history } = this.props;

        if (!userSignedIn) {
            history.push("/login");
        }

        if (userSignedIn && history.location.pathname === "/login") {
            history.push("/");
        }

        if (userSignedIn && !this.state.timelogs) {
            this.fetchTimelogs();
        }

        this.setState({ userSignedIn });
    }

    render() {
        const { storageClientLoaded, userSignedIn, timelogs } = this.state;
        const { storage } = this.props;

        return (
            <Loader isLoaded={storageClientLoaded}>
                <div className="app">
                    <div className="header">
                        {(
                            userSignedIn &&
                            <button onClick={storage.signOut}>Signout</button>
                        )}
                        <Link to="/">Home</Link>
                    </div>
                    <div className="main">
                        <Route exact path="/" render={({ history }) => {
                            return (
                                <TimelogList
                                    timelogs={timelogs || []}
                                />
                            )
                        }} />
                        <Route path="/login" render={({ history }) => {
                            return (
                                <Login
                                    onSignin={storage.signIn}
                                />
                            )
                        }} />

                        <Route path="/new" render={() => (
                            <CreateTimelog />
                        )} />
                        <Route path="/edit/:timelogId" render={() => (
                            <EditTimelog />
                        )} />
                    </div>
                </div>
            </Loader>
        )
    }

}


export default withRouter(App)