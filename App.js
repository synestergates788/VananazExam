import React, {Component} from 'react';
import {Platform} from 'react-native';

import Login from './src/components/Login';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
        <Login />
    );
  }
}
