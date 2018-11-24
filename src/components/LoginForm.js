import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {

//Start with email and password as empty strings
//We update the state of those fields as user types
  state = { email: '', password: '', error: '' };

//Firebase method to check creds on pressing Log In button
  onButtonPress() {
    const { email, password } = this.state;

    //clears out error state every time the button is pressed
    this.setState({ error: '' });

    firebase.auth().signInWithEmailAndPassword(email, password)
      //if sign in fails, we attempt to create and account with the same creds
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)

        //if creation fails, we need to render an error message for failed login
        .catch(() => {
          this.setState({ error: 'Authentication Failed.' });
        });
      });
  }


  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder='user@gmail.com'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='password'
            label='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Log In
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
