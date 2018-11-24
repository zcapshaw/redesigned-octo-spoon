import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

//Start with email and password as empty strings
//We update the state of those fields as user types
  state = { email: '', password: '', error: '', loading: false };

//Firebase method to check creds on pressing Log In button
  onButtonPress() {
    const { email, password } = this.state;

    //clears out error state every time the button is pressed
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)

      //if login is successful
      .then(this.onLoginSuccess.bind(this))

      //if sign in fails, we attempt to create and account with the same creds
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))

        //if creation fails, we need to render an error message for failed login
          .catch(this.onLoginFail.bind(this));
      });
  }

//Helper method - what to do in a successful login
//we want to clear out inputs, hide loading spinner, and clear errors
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

//Helper method - what to do when login fails
//Set error message and stop spinner
  onLoginFail() {
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    });
  }

//Helper method to handle 'loading' state (e.g. show button or spinner)
  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
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
          {this.renderButton()}
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
