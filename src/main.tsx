import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button, Select, Form} from 'antd';
import {StoreType} from './store';

const {Option} = Select;

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
    const layout = {
      labelCol: {span: 8},
      wrapperCol: {span: 8},
    };
    const tailLayout = {
      wrapperCol: {offset: 8, span: 8},
    };
    return (
      <>
        <Form {...layout}>
          <Form.Item label="Video Input">
            <Devices
              devices={store.videoInputs}
              onChange={d => (store.videoInput = d)}
            />
          </Form.Item>
          <Form.Item label="Audio Input">
            <Devices
              devices={store.audioInputs}
              onChange={d => (store.audioInput = d)}
            />
          </Form.Item>
          <Form.Item label="Audio Output">
            <Devices
              devices={store.audioOutputs}
              onChange={d => (store.audioOutput = d)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              onClick={() => store.play()}
              type="primary"
              htmlType="button"
            >
              Play
            </Button>
            <Button onClick={() => store.fullscreen()} htmlType="button">
              Fullscreen
            </Button>
          </Form.Item>
        </Form>
        <hr />
        <video width="900" height="600" id="video-player"></video>
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
      <Select
        defaultValue={devices[0].deviceId}
        onChange={v => onChange(devices.find(d => d.deviceId === v)!)}
      >
        {devices.map(d => (
          <Option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </Option>
        ))}
      </Select>
    );
  }
}

export default App;
