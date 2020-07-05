import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button} from 'antd';
import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};

type PropsDevices = {
  devices: MediaDeviceInfo[];
  kind: string;
};

class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.ready ? <Main store={store} /> : <Spin size="large" />;
  }
}

class Main extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return (
      <>
        Video Input: <Devices devices={store.devices} kind="videoinput" />
        Audio Input: <Devices devices={store.devices} kind="audioinput" />
        Video Output: <Devices devices={store.devices} kind="audiooutput" />
        <Button onClick={() => store.play()}>Play</Button>
        <hr />
        <video width="800" height="600" id="video-player"></video>
      </>
    );
  }
}

class Devices extends Component<PropsDevices> {
  render() {
    const {devices, kind} = this.props;
    return (
      <select id={kind} onChange={e => console.log(e.target.value)}>
        {devices
          // .filter(d => d.kind === kind && d.deviceId !== 'default')
          .filter(d => d.kind === kind)
          .map(d => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))}
      </select>
    );
  }
}

export default App;
