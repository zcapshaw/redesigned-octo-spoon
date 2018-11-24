import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCITXuhB345xdv3lDjoWeQRlsLwqciK9GE',
      authDomain: 'redesigned-octo-spoon-ea90f.firebaseapp.com',
      databaseURL: 'https://redesigned-octo-spoon-ea90f.firebaseio.com',
      projectId: 'redesigned-octo-spoon-ea90f',
      storageBucket: 'redesigned-octo-spoon-ea90f.appspot.com',
      messagingSenderId: '723056823311'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        <LoginForm />
      </View>
    );
  }
}
