import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Card, CardSection } from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm'

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCITXuhB345xdv3lDjoWeQRlsLwqciK9GE',
      authDomain: 'redesigned-octo-spoon-ea90f.firebaseapp.com',
      databaseURL: 'https://redesigned-octo-spoon-ea90f.firebaseio.com',
      projectId: 'redesigned-octo-spoon-ea90f',
      storageBucket: 'redesigned-octo-spoon-ea90f.appspot.com',
      messagingSenderId: '723056823311'
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
