export class Webcam {
  webcamEl;
  allWebcams = [];
  currentWebcam = '';
  currentDeviceId = '';

  constructor({ el = '#webcam' } = {}) {
    if (!this.#hasGetUserMedia()) {
      throw new Error('No support for webcams detected. Quit.');
    }
    this.webcamEl = document.querySelector(el);
  }

  init = async () => {
    this.currentDeviceId = this.webcamEl.srcObject;
    this.allWebcams = await this.getAllWebcams();
    this.currentWebcam = await this.#getWebcam();
    // activate webcam stream
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.webcamEl.srcObject = stream;
    });
  };

  #getWebcam = async () => {
    return this.allWebcams.find(
      videoInput => videoInput.deviceId !== this.currentDeviceId,
    );
  };

  #hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  #setWebcam = device => {
    const constraints = { video: { deviceId: device.deviceId } };
    const webcamEl = this.webcamEl;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        console.log(this);
        webcamEl.srcObject = stream;
      })
      .catch(function (error) {
        console.error('Error switching camera:', error);
      });
  };

  getAllWebcams = async () => {
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

  nextWebcam = async () => {
    const nextDevice = this.allWebcams.find(
      device => device.id === this.currentDeviceId,
    );
    if (nextDevice) {
      this.#setWebcam(nextDevice);
    }
  };

  setWebcamByLabel = async webcamLabel => {
    // get webcam by label
    const webcam = this.allWebcams.find(cam => cam.label === webcamLabel);
    if (webcam) {
      this.#setWebcam(webcam);
    }
  };
}
