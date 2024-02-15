/* eslint-disable no-new */
import GUI from 'lil-gui';
import Phaser from 'phaser';
import { HandTracking } from '../../../lib/mediapipe/hand-tracking.js';

/**
 * Phaser3 Lifecycle functions
 */

class Example extends Phaser.Scene {
  constructor() {
    super('Example');
    this._handTracking = null;
  }

  preload() {
    const { width, height } = this.sys.game.canvas;
    this._width = width;
    this._height = height;
  }

  create() {
    // add sprites for left and right hand
    this.leftHand = this.add.circle(0, 0, 30, 0xe4bfc8);
    this.rightHand = this.add.circle(0, 0, 30, 0xe4bfc8);
    this.physics.add.existing(this.leftHand);
    this.physics.add.existing(this.rightHand);

    /**
     * Hand-Tracking
     */

    HandTracking.initialize({
      hands: 2,
      width: this._width,
      height: this._height,
      webcamOptions: { video: { width: this._width, height: this._height } },
    }).then(tracker => {
      this._handTracking = tracker;

      // register gesture handler
      this._handTracking.on('gestureDetected', this.handleGesture.bind(this));

      // register resize action
      this.scale.on('resize', this.handleResize, this);

      // gui
      const gui = new GUI();
      const config = {
        backCamera: async () => {
          window.webcam.stop();
          window.webcam.startBack();
        },
        frontCamera: async () => {
          window.webcam.stop();
          window.webcam.startFront();
        },
      };

      gui.add(config, 'backCamera');
      gui.add(config, 'frontCamera');
    });
  }

  update() {
    if (!this._handTracking) return;

    this._handTracking.getHands(this._width, this._height);
  }

  // handler
  handleGesture(hands) {
    if (!hands) return;

    const selectedHand =
      hands.handName === 'handRight' ? this.rightHand : this.leftHand;

    selectedHand.setX(hands.x);
    selectedHand.setY(hands.y);
    selectedHand.body.reset(hands.x, hands.y);
  }

  handleResize(gameSize) {
    if (!window.webcam) return;

    this._width = gameSize.width;
    this._height = gameSize.height;

    this.cameras.resize(this._width, this._height);

    window.webcam.changeOptions({
      video: { width: this._width, height: this._height },
    });
  }
}

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'game',
    width: '100%',
    height: '100%',
  },
  scene: Example,
};

const game = new Phaser.Game(config);

// !!! - (debug) - adding to window object for debugging
window.game = game;
