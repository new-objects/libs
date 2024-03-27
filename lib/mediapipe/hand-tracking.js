import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { Webcam } from '../web/webcam';

const VISION_WASM =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm';
const GESTURE_RECOGNIZER_TASK =
  'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

export class HandTracking {
  width;
  height;
  flipY;
  events;
  lastVideoTime;
  tracker;
  videoEl;

  constructor(tracker, videoEl, width, height, flipX, flipY) {
    this.width = width;
    this.height = height;
    this.flipX = flipX;
    this.flipY = flipY;
    this.events = {};
    this.tracker = tracker;
    this.videoEl = videoEl;
    this.lastVideoTime = -1;
  }

  static initialize = async options => {
    const videoId = options?.videoId || 'webcam';
    const hands = options?.hands || 1;
    const width = options?.width || null;
    const height = options?.height || null;
    const flipY = options?.flipY || false;
    const flipX = options?.flipX || false;
    const webcamOptions = options?.webcamOptions || { video: true };

    if (!width || !height) {
      throw new Error('Not enough parameters.');
    }

    let videoEl = document.querySelector(`#${videoId}`);

    if (!videoEl) {
      videoEl = document.createElement('video');
      videoEl.setAttribute('id', videoId);

      document.body.appendChild(videoEl);
    }
    const webcam = await Webcam.initialize({
      videoId,
      webcamOptions,
    });
    await webcam.start();
    // !!! - (debug) - experiment with webcam class
    window.webcam = webcam;

    let tracker;
    try {
      tracker = await HandTracking.loadGestureRecognizer(hands);
      console.log('HandTracking initialized');
    } catch (err) {
      console.error(err);
    }

    return new HandTracking(tracker, videoEl, width, height, flipX, flipY);
  };

  on = (eventName, fn) => {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  };

  emit = (eventName, data) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(data));
    }
  };

  static loadGestureRecognizer = async hands => {
    const vision = await FilesetResolver.forVisionTasks(VISION_WASM);
    const gestureRecognizer = await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: GESTURE_RECOGNIZER_TASK,
          delegate: 'GPU',
        },
        numHands: hands,
        runningMode: 'VIDEO',
      },
    );

    return gestureRecognizer;
  };

  /**
   * Returns the raw data of mediapipe hand tracking module for Video streams
   */
  getResultRaw = () => {
    if (!this.tracker) {
      return this;
    }
    if (this.videoEl.readyState !== this.videoEl.HAVE_ENOUGH_DATA) {
      return this;
    }

    /** @type {import('@mediapipe/tasks-vision').GestureRecognizerResult} */
    return this.tracker.recognizeForVideo(this.videoEl, Date.now());
  };

  /**
   * Returns an objects with x, y values and gesture for the tracked hands
   * @param {Number} width - width of the game
   * @returns {Object} - An object containing x, y and gesture per tracked hand
   */
  getHands = (width, height) => {
    const hands = { detected: false };
    const trackingResultsRaw = this.getResultRaw();

    if (trackingResultsRaw.landmarks) {
      // only start detecting if the hand root is detected
      if (
        (trackingResultsRaw.landmarks[0] &&
          trackingResultsRaw.landmarks[0][0]) ||
        (trackingResultsRaw.landmarks[1] && trackingResultsRaw.landmarks[1][0])
      ) {
        hands.detected = true;
      }
      trackingResultsRaw.handedness.forEach((hand, index) => {
        const handName =
          hand[0].categoryName === 'Left' ? 'handLeft' : 'handRight'; // left or right

        const { x, y } = trackingResultsRaw.landmarks[index][9];
        let posY = y;
        let posX = x;
        if (this.flipY) {
          posY = 1 - y;
        }
        if (this.flipX) {
          posX = 1 - x;
        }

        const gesture = trackingResultsRaw.gestures[index][0].categoryName;

        hands[handName] = {
          handName,
          x: width - posX * width || 0,
          y: posY * height || 0,
          gesture,
          x_raw: x,
          y_raw: y,
        };

        // Emit if gesture is "openFist"
        if (
          gesture === 'Closed_Fist' ||
          gesture === 'Open_Palm' ||
          gesture === 'Thumbs_Down' ||
          gesture === 'Thumbs_Up'
        ) {
          this.emit('gestureDetected', hands[handName]);
        }
      });
    } else {
      hands.detected = false;
    }

    return hands;
  };
}
