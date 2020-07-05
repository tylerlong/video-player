import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button} from 'antd';
import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
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
        Video Input:{' '}
        <Devices
          devices={store.videoInputs}
          onChange={d => (store.videoInput = d)}
        />
        Audio Input:{' '}
        <Devices
          devices={store.audioInputs}
          onChange={d => (store.audioInput = d)}
        />
        Video Output:{' '}
        <Devices
          devices={store.audioOutputs}
          onChange={d => (store.audioOutput = d)}
        />
        <Button onClick={() => store.play()}>Play</Button>
        <hr />
        <video width="800" height="600" id="video-player"></video>
      </>
    );
  }
}

type PropsDevices = {
  devices: MediaDeviceInfo[];
  onChange: (d: MediaDeviceInfo) => void;
};
class Devices extends Component<PropsDevices> {
  render() {
    const {devices, onChange} = this.props;
    return (
      <select
        onChange={e =>
          onChange(devices.find(d => d.deviceId === e.target.value)!)
        }
      >
        {devices.map(d => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </option>
        ))}
      </select>
    );
  }
}

export default App;
