/* eslint-disable no-new */
import Phaser from 'phaser';
import { Webcam } from '../../lib/web/webcam';
import { webcamGui } from '../../lib/utils';

class Example extends Phaser.Scene {
  constructor() {
    super('Example');
    this._handTracking = null;
  }

  preload() {
    const { width, height } = this.sys.game.canvas;
    this._width = width;
    this._height = height;

    this.load.spritesheet('fullscreenCtrl', 'assets/fullscreen.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // add sprites for left and right hand
    this.leftHand = this.add.circle(0, 0, 30, 0xe4bfc8);
    this.rightHand = this.add.circle(0, 0, 30, 0xe4bfc8);
    this.physics.add.existing(this.leftHand);
    this.physics.add.existing(this.rightHand);

    Webcam.initialize({
      webcamOptions: { video: { width: this._width, height: this._height } },
    }).then(() => {
      // gui
      webcamGui();
    });

    // register resize action
    this.scale.on('resize', this.handleResize, this);

    // fullscreen control
    const button = this.add
      .image(this._width - 16, 16, 'fullscreenCtrl', 0)
      .setOrigin(1, 0)
      .setInteractive();

    button.on(
      'pointerup',
      function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);

          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);

          this.scale.startFullscreen();
        }
      },
      this,
    );
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
