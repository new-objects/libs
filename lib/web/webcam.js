export class Webcam {
  webcamEl;
  allWebcams = [];

  constructor(allWebcams, videoEl, webcamOptions) {
    this.allWebcams = allWebcams;
    this.videoEl = videoEl;
    this.webcamOptions = webcamOptions;
    this.stream = null;
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
    navigator.mediaDevices.getUserMedia(this.webcamOptions).then(
      stream => {
        // webcam selected!
        this.stream = stream;
        this.settings = stream.getVideoTracks()[0].getSettings();
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

  getActive = async () => {
    return this.allWebcams.find(
      videoInput => videoInput.deviceId !== this.stream,
    );
  };

  changByDevice = device => {
    this.webcamOptions = { video: { deviceId: device.deviceId } };
  };

  changeByLabel = async webcamLabel => {
    const webcam = this.allWebcams.find(cam => cam.label === webcamLabel);
    if (webcam) {
      this.changeWebcamByDevice(webcam);
    }
  };

  changeOptions = async newOptions => {
    this.webcamOptions = { ...this.webcamOptions, ...newOptions };
    // XXX
    console.log(this.webcamOptions);
    this.stop();
    await this.start();
  };
}
