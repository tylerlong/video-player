(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
  const videoInput = document.getElementById('video-input')!;
  const audioInput = document.getElementById('audio-input')!;
  const audioOutput = document.getElementById('audio-output')!;
  for (const device of devices) {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label;
    switch (device.kind) {
      case 'videoinput': {
        videoInput.appendChild(option);
        break;
      }
      case 'audioinput': {
        audioInput.appendChild(option);
        break;
      }
      case 'audiooutput': {
        audioOutput.appendChild(option);
        break;
      }
    }
  }

  const video = document.getElementById('video-player')! as HTMLVideoElement;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  video.play();
})();
