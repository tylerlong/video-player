import SubX from 'subx';

export type StoreType = {
  ready: boolean;
  playing: boolean;
  devices: MediaDeviceInfo[];
  videoInput?: MediaDeviceInfo;
  audioInput?: MediaDeviceInfo;
  audioOutput?: MediaDeviceInfo;
  videoInputs: MediaDeviceInfo[];
  audioInputs: MediaDeviceInfo[];
  audioOutputs: MediaDeviceInfo[];
  init: () => void;
  play: () => void;
  pause: () => void;
};

const videoConstraints = {
  width: {ideal: 1920},
  height: {ideal: 1080},
  frameRate: {ideal: 60},
};
const audioConstraints = {
  channelCount: {ideal: 2},
};

const store = SubX.proxy<StoreType>({
  ready: false,
  playing: false,
  devices: [],
  async init() {
    // request permissions
    await navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
      video: videoConstraints,
    });
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
        ...audioConstraints,
        deviceId: {exact: (this.audioInput ?? this.audioInputs[0]).deviceId},
      },
      video: {
        ...videoConstraints,
        deviceId: {exact: (this.videoInput ?? this.videoInputs[0]).deviceId},
      },
    });

    // debug video/audio track quality
    for (const track of stream.getTracks()) {
      console.log(JSON.stringify(track.getSettings(), null, 2));
    }

    videoElement.srcObject = stream;
    videoElement.play();
    this.playing = true;
  },
  pause() {
    (document.getElementById('video-player')! as HTMLVideoElement).pause();
    this.playing = false;
  },
});

export default store;
