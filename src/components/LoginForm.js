import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };


  render() {
    return (
      <Card>
        <CardSection>
          <Text Input> words </Text>
        </CardSection>

        <CardSection>
          <Text> words </Text>
        </CardSection>

        <CardSection>
          <Button>
            Log in
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
