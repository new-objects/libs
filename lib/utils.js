import GUI from 'lil-gui';

const isObject = x => typeof x === 'object' && !Array.isArray(x);

/**
 * Merges two objects recursively, prioritizing values from the second object.
 * If a shared key exists in both objects and the value in the first object is an object,
 * it recursively merges the nested objects.
 * If a shared key exists in both objects and the value in the first object is not an object,
 * it replaces the value with the value from the second object.
 *
 * @param {object} obj1 - The first object to merge.
 * @param {object} obj2 - The second object to merge.
 * @returns {object} A new object resulting from the merge of obj1 and obj2.
 * @example
 * const obj1 = { a: { b: 2 }, c: 3 };
 * const obj2 = { a: { d: 4 }, e: 5 };
 * const merged = mergeObjects(obj1, obj2);
 * // merged will be { a: { b: 2, d: 4 }, c: 3, e: 5 }
 */
function mergeObjects(obj1, obj2) {
  const merged = { ...obj1 };

  for (const key in obj2) {
    if (
      isObject(obj2[key]) &&
      obj2[key] !== null &&
      isObject(merged[key]) &&
      merged[key] !== null
    ) {
      merged[key] = mergeObjects(merged[key], obj2[key]);
    } else {
      merged[key] = obj2[key];
    }
  }

  return merged;
}

const webcamGui = () => {
  const resolution = {
    '1080p': {
      width: 1920,
      height: 1080,
    },
    '720p': {
      width: 1280,
      height: 720,
    },
    '450p': {
      width: 800,
      height: 450,
    },
    '360p': {
      width: 640,
      height: 360,
    },
  };
  const mediaStreamSettings = webcam.stream.getVideoTracks()[0].getSettings();
  const gui = new GUI();
  const config = {
    activeCamera: window.webcam.currentWebcam.label,
    backCamera: async () => {
      window.webcam.stop();
      window.webcam.startBack();
    },
    frontCamera: async () => {
      window.webcam.stop();
      window.webcam.startFront();
    },
    width: mediaStreamSettings.width,
  };
  // switch active webcam
  gui
    .add(
      config,
      'activeCamera',
      window.webcam.allWebcams.map(cam => cam.label),
    )
    .name('Select camera')
    .onChange(value => window.webcam.changeByLabel(value));

  gui.add(config, 'backCamera').name('Switch to rear camera');
  gui.add(config, 'frontCamera').name('Switch to front camera');

  gui.add(config, 'width', Object.keys(resolution)).onChange(value => {
    const newOptions = mergeObjects(window.webcam.webcamOptions, {
      video: {
        width: resolution[value].width,
        height: resolution[value].height,
      },
    });
    window.webcam.changeOptions(newOptions);
  });
};

export { mergeObjects, webcamGui };
