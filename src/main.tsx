import React from 'react';
import {Component} from 'react-subx';
import {Spin, Button, Select, Form, Divider, Space} from 'antd';

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
          <Devices
            label="Video Input"
            devices={store.videoInputs}
            onChange={d => (store.videoInput = d)}
          />
          <Devices
            label="Audio Input"
            devices={store.audioInputs}
            onChange={d => (store.audioInput = d)}
          />
          <Form.Item {...tailLayout}>
            <Space>
              <Button
                onClick={() => (store.playing ? store.pause() : store.play())}
                type="primary"
                htmlType="button"
              >
                {store.playing ? 'Pause' : 'Play'}
              </Button>
              <Button
                onClick={() =>
                  document.getElementById('video-player')!.requestFullscreen()
                }
                htmlType="button"
              >
                Fullscreen
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider />
        <video id="video-player"></video>
      </>
    );
  }
}

type PropsDevices = {
  devices: MediaDeviceInfo[];
  label: string;
  onChange: (d: MediaDeviceInfo) => void;
};
class Devices extends Component<PropsDevices> {
  render() {
    const {devices, label, onChange} = this.props;
    return (
      <Form.Item label={label}>
        <Select
          defaultValue={devices[0].deviceId}
          onChange={v => onChange(devices.find(d => d.deviceId === v)!)}
        >
          {devices.map(d => (
            <Select.Option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export default App;
