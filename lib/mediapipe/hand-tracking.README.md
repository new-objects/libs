# HandTracking Class

This is a JavaScript class representing a hand tracking utility that allows users to detect and track hands in a video stream. It utilizes the MediaPipe framework for hand tracking.

## Table of Contents

- [HandTracking Class](#handtracking-class)
  - [Table of Contents](#table-of-contents)
  - [Class: HandTracking](#class-handtracking)
    - [Static Methods](#static-methods)
      - [`initialize(options: Object): Promise<HandTracking>`](#initializeoptions-object-promisehandtracking)
      - [`loadGestureRecognizer(hands: Number): Promise<GestureRecognizer>`](#loadgesturerecognizerhands-number-promisegesturerecognizer)
    - [Instance Methods](#instance-methods)
      - [`on(eventName: String, fn: Function): void`](#oneventname-string-fn-function-void)
      - [`emit(eventName: String, data: any): void`](#emiteventname-string-data-any-void)
      - [`getResultRaw(): GestureRecognizerResult`](#getresultraw-gesturerecognizerresult)
      - [`getHands(width: Number): Object`](#gethandswidth-number-object)

## Class: HandTracking

Represents a hand tracking utility for detecting and tracking hands in a video stream.

### Static Methods

#### `initialize(options: Object): Promise<HandTracking>`

- Initializes the hand tracking utility asynchronously.
- `options` (Object):
  - `videoId` (String, optional): ID of the HTML video element. Default is 'webcam'.
  - `hands` (Number, optional): Number of hands to track. Default is 1.
  - `width` (Number, optional): Width of the video stream.
  - `height` (Number, optional): Height of the video stream.
  - `flipY` (Boolean, optional): Whether to flip the video vertically. Default is false.
  - `webcamOptions` (MediaStreamConstraints, optional): Constraints for accessing the webcam stream.
- Returns a Promise that resolves to a `HandTracking` instance.

#### `loadGestureRecognizer(hands: Number): Promise<GestureRecognizer>`

- Loads the gesture recognizer model asynchronously.
- `hands` (Number): Number of hands to track.
- Returns a Promise that resolves to a `GestureRecognizer` instance.

### Instance Methods

#### `on(eventName: String, fn: Function): void`

- Registers an event listener for the specified event.
- `eventName` (String): Name of the event to listen for.
- `fn` (Function): Event handler function.

#### `emit(eventName: String, data: any): void`

- Emits an event with the specified name and data.
- `eventName` (String): Name of the event to emit.
- `data` (any): Data to pass to event listeners.

#### `getResultRaw(): GestureRecognizerResult`

- Returns the raw data of the MediaPipe hand tracking module for video streams.
- Returns a `GestureRecognizerResult` object.

#### `getHands(width: Number): Object`

- Returns an object with x, y values and gesture for the tracked hands.
- `width` (Number): Width of the game.
- Returns an object containing x, y, and gesture per tracked hand.
