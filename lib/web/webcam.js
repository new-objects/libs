export class Webcam {
  webcamEl;
  allWebcams = [];

  constructor(allWebcams, videoEl, webcamOptions) {
    this.allWebcams = allWebcams;
    this.currentWebcam = null;
    this.stream = null;
    this.videoEl = videoEl;
    this.webcamOptions = webcamOptions;
  }

  static initialize = async options => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('No support for webcams detected. Quit.');
    }

    const videoId = options?.videoId || 'webcam';
    const webcamOptions = options?.webcamOptions || { video: true };
    const videoEl = document.querySelector(`#${videoId}`);
    const allWebcams = await Webcam.getAll();

    return new Webcam(allWebcams, videoEl, webcamOptions);
  };

  static getAll = async () => {
    return navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        const videoDevices = devices.filter(
          device => device.kind === 'videoinput',
        );
        return videoDevices;
      })
      .catch(function (error) {
        console.error('Error enumerating devices:', error);
      });
  };

  start = async () => {
    // activate webcam stream
    await navigator.mediaDevices.getUserMedia(this.webcamOptions).then(
      stream => {
        // webcam selected!
        this.stream = stream;
        this.currentWebcam = this.#getActive();
        this.videoEl.srcObject = stream;
        this.videoEl.onloadedmetadata = () => {
          this.videoEl.play();
        };
        console.log('Video initialized');
      },
      // error cb
      err => {
        console.error(`The following error occurred: ${err.name}`);
      },
    );
  };

  startFront = async () => {
    const userFacingCam = { video: { facingMode: 'user' } };
    this.webcamOptions = { ...this.webcamOptions, ...userFacingCam };

    await this.start();
  };

  startBack = async () => {
    const backCam = { video: { facingMode: 'environment' } };
    this.webcamOptions = { ...this.webcamOptions, ...backCam };

    await this.start();
  };

  stop = () => {
    // deactivate webcam stream
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  };

  changeByDevice = async device => {
    this.webcamOptions = { video: { deviceId: device.deviceId } };

    this.stop();
    await this.start();
  };

  changeByLabel = async label => {
    const webcam = this.allWebcams.find(cam => cam.label === label);
    if (webcam) {
      await this.changeByDevice(webcam);
    } else {
      throw new Error(`Webcam not found.`);
    }
  };

  changeOptions = async newOptions => {
    this.webcamOptions = { ...this.webcamOptions, ...newOptions };

    this.stop();
    await this.start();
  };

  #getActive = () => {
    return this.allWebcams.find(
      v => v.label === this.stream.getVideoTracks()[0].label,
    );
  };
}
