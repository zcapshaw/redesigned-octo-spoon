
import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import config from './config';

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  //if user is loggedin, show the logout page
  //if we don't know user state, show spinner
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ height: 45 }}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ marginTop: 100 }}>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}
