import SubX from 'subx';

export type StoreType = {
  ready: boolean;
  devices: MediaDeviceInfo[];
  init: () => void;
  videoInput?: MediaDeviceInfo;
  audioInput?: MediaDeviceInfo;
  audioOutput?: MediaDeviceInfo;
  videoInputs: MediaDeviceInfo[];
  audioInputs: MediaDeviceInfo[];
  audioOutputs: MediaDeviceInfo[];
  play: () => void;
};

const store = SubX.proxy<StoreType>({
  ready: false,
  devices: [],
  async init() {
    this.devices = (await navigator.mediaDevices.enumerateDevices()).map(d =>
      d.toJSON()
    );
  },
  get videoInputs(): MediaDeviceInfo[] {
    return this.devices.filter(d => d.kind === 'videoinput');
  },
  get audioInputs(): MediaDeviceInfo[] {
    return this.devices.filter(d => d.kind === 'audioinput');
  },
  get audioOutputs(): MediaDeviceInfo[] {
    return this.devices.filter(d => d.kind === 'audiooutput');
  },
  async play() {
    const videoElement = document.getElementById(
      'video-player'
    )! as HTMLVideoElement;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: {exact: (this.audioInput ?? this.audioInputs[0]).deviceId},
      },
      video: {
        deviceId: {exact: (this.videoInput ?? this.videoInputs[0]).deviceId},
      },
    });
    videoElement.srcObject = stream;
    videoElement.play();
  },
});

export default store;
