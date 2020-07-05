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
  fullscreen: () => void;
};

const store = SubX.proxy<StoreType>({
  ready: false,
  devices: [],
  async init() {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: {ideal: 1920},
        height: {ideal: 1080},
        frameRate: {ideal: 60},
      },
    }); // request permission
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
        width: {ideal: 1920},
        height: {ideal: 1080},
        frameRate: {ideal: 60},
        deviceId: {exact: (this.videoInput ?? this.videoInputs[0]).deviceId},
      },
    });

    // debug video/audio track quality
    for (const track of stream.getTracks()) {
      console.log(JSON.stringify(track.getSettings(), null, 2));
    }

    videoElement.srcObject = stream;
    videoElement.play();
  },
  async fullscreen() {
    document.getElementById('video-player')!.requestFullscreen();
  },
});

export default store;
