import React from 'react';
import {Component} from 'react-subx';
import {Spin} from 'antd';
import store from './store';

export interface Props {
  store: typeof store;
}

class App extends Component<Props> {
  render() {
    const store = this.props.store;
    return store.ready ? <Main store={store} /> : <Spin size="large" />;
  }
}

class Main extends Component<Props> {
  render() {
    const store = this.props.store;
    return (
      <>
        Video Input:{' '}
        <select id="video-input">
          {store.devices
            .filter(d => d.kind === 'videoinput')
            .map(d => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label}
              </option>
            ))}
        </select>
        Audio Input:{' '}
        <select id="audio-input">
          {store.devices
            .filter(d => d.kind === 'audioinput')
            .map(d => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label}
              </option>
            ))}
        </select>
        Audio Output:{' '}
        <select id="audio-output">
          {store.devices
            .filter(d => d.kind === 'audiooutput')
            .map(d => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label}
              </option>
            ))}
        </select>
        <hr />
        <video width="800" height="600" id="video-player"></video>
      </>
    );
  }
}

export default App;
