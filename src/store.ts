import SubX from 'subx';

const store = SubX.proxy({
  ready: false,
  devices: [] as MediaDeviceInfo[],
  async init() {
    this.devices = (await navigator.mediaDevices.enumerateDevices()).map(d =>
      d.toJSON()
    );
  },
});

export default store;
