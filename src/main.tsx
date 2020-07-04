import React from 'react';
import {SubxObj} from 'subx/build/types';
import {Component} from 'react-subx';
import {Spin, Button} from 'antd';

export interface Props {
  store: SubxObj;
}

class App extends Component<Props> {
  render() {
    const store = this.props.store;
    return store.ready ? (
      <a href={store.authorizeUri} target="_parent">
        <Button size="large" type="primary">
          Login GitHub
        </Button>
      </a>
    ) : (
      <Spin size="large" />
    );
  }
}

export default App;
