import SubX from 'subx';
import {SubxObj} from 'subx/build/src/types';
import {filter} from 'rxjs/operators';

export type StoreType = {
  ready: boolean;
  playing: boolean;
  devices: MediaDeviceInfo[];
  videoInput?: MediaDeviceInfo;
  audioInput?: MediaDeviceInfo;
  videoInputs: MediaDeviceInfo[];
  audioInputs: MediaDeviceInfo[];
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
    return this.devices.filter(
      d => d.kind === 'videoinput' && d.deviceId !== 'default'
    );
  },
  get audioInputs(): MediaDeviceInfo[] {
    return this.devices.filter(
      d => d.kind === 'audioinput' && d.deviceId !== 'default'
    );
  },
  async play() {
    const videoElement = document.getElementById(
      'video-player'
    )! as HTMLVideoElement;

    // release old devices
    const oldStream = videoElement.srcObject as MediaStream;
    if (oldStream !== null) {
      for (const track of oldStream.getTracks()) {
        track.stop();
      }
    }

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

(store as SubxObj<StoreType>).$.pipe(
  filter(
    e =>
      store.playing &&
      e.path.length === 1 &&
      ['videoInput', 'audioInput'].includes(e.path[0])
  )
).subscribe(() => {
  store.play();
});

export default store;
