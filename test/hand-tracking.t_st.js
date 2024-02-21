/* eslint-disable no-unused-vars */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HandTracking } from '../lib/mediapipe/hand-tracking';

describe('Testing HandTracking class', () => {
  // Mocks
  navigator.mediaDevices = {
    getUserMedia: vi.fn(),
  };
  navigator.mediaDevices.getUserMedia = vi.fn().mockResolvedValue({
    getVideoTracks: () => [
      { getSettings: () => ({ width: 640, height: 480 }) },
    ],
  });

  // Setup
  let handTracking;

  beforeEach(async () => {
    handTracking = await HandTracking.initialize();
  });

  // Tear-down
  afterEach(() => {
    handTracking = null;
    vi.clearAllMocks();
  });

  /**
   * TESTS
   */
  it('is creating a HandTracking object', () => {
    expect(handTracking).toBeDefined();
    expect(handTracking).toBeInstanceOf(HandTracking);
  });

  it('is working with the correct dimensions (width and heigh)', () => {});

  it('video element has the the id "webcam"', () => {
    expect(handTracking.videoId).toBe('webcam');
  });

  it('video element with the id webcam exists in the dom', () => {
    const videoEl = document.querySelector(`#webcam`);
    expect(videoEl.id).toBe('webcam');
  });

  it('different video id works as well', () => {
    handTracking = new HandTracking({ videoEl: 'webcam2' });

    const videoEl = document.querySelector(`#webcam2`);
    expect(videoEl.id).toBe('webcam2');
  });

  it('default value of hands equals 1', () => {
    expect(handTracking.hands).toBe(1);
  });

  it('different hand value works as well', () => {
    handTracking = new HandTracking({ hands: 2 });

    expect(handTracking.hands).toBe(2);
  });

  it('on and emit methods', () => {
    const mockFn = vi.fn();
    handTracking.on('testEvent', mockFn);
    handTracking.emit('testEvent', 'testData');
    expect(mockFn).toHaveBeenCalledWith('testData');
  });
  // !!! - (broken) - cannot load this method in vitest.
  it('loadGestureRecognizer method', async () => {
    const result = await handTracking.loadGestureRecognizer();
  });
});

// To create unit tests for the
// HandTracking
//  class, you can use a testing framework like Jest. Here are some potential test cases you could consider:

// Test the initialization of the
// HandTracking
//  class:
// Verify that the
// videoEl
//  property is set correctly based on the provided options.
// Ensure that the
// hands
//  property is set to the correct value.
// Test the
// on
//  and
// emit
//  methods:
// Add event listeners using the
// on
//  method and check if the corresponding functions are called when events are emitted using the
// emit
//  method.
// Test the
// loadGestureRecognizer
//  method:
// Mock the necessary dependencies and verify that the method returns the expected result.
// Test the
// initVideo
//  method:
// Mock the necessary dependencies to simulate the successful initialization of the video element.
// Check that the video element's
// srcObject
//  is set correctly.
// Verify that the
// loadedmetadata
//  event listener is added and executed successfully.
// Test the
// getResultRaw
//  method:
// Mock the necessary dependencies to simulate a valid
// tracker
//  object.
// Verify that the method returns the expected result when the video element has enough data.
// Test the
// getHands
//  method:
// Mock the necessary dependencies to simulate a valid
// trackingResultsRaw
//  object.
// Test different scenarios:
// When
// flipY
//  is false: Verify that the calculated
// y
//  value matches the expected formula.
// When
// flipY
//  is true: Verify that the
// posY
//  value is correctly inverted.
// Verify that the
// x
//  and
// y
//  values are calculated correctly based on the provided
// width
//  and
// height
// .
// Test with different gestures and ensure that the appropriate events are emitted.
// Remember to mock any external dependencies or objects, such as the
// navigator.mediaDevices.getUserMedia
//  function and the
// GestureRecognizerResult
//  object, to isolate the tests for each method and ensure that they are independent and atomic.
