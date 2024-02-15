# Webcam Class

This is a JavaScript class representing a webcam utility that allows users to interact with webcams in a web environment. It provides methods for accessing and controlling webcams, such as starting, stopping, switching between front and back cameras, changing webcam options, and more.

## Table of Contents

- [Webcam Class](#webcam-class)
  - [Table of Contents](#table-of-contents)
  - [Class: Webcam](#class-webcam)
    - [Static Methods](#static-methods)
      - [`initialize(options: { videoId?: string, webcamOptions?: MediaStreamConstraints }): Promise<Webcam>`](#initializeoptions--videoid-string-webcamoptions-mediastreamconstraints--promisewebcam)
      - [`getAll(): Promise<MediaDeviceInfo[]>`](#getall-promisemediadeviceinfo)
    - [Instance Methods](#instance-methods)
      - [`start(): Promise<void>`](#start-promisevoid)
      - [`startFront(): Promise<void>`](#startfront-promisevoid)
      - [`startBack(): Promise<void>`](#startback-promisevoid)
      - [`stop(): void`](#stop-void)
      - [`changeByDevice(device: MediaDeviceInfo): Promise<void>`](#changebydevicedevice-mediadeviceinfo-promisevoid)
      - [`changeByLabel(label: string): Promise<void>`](#changebylabellabel-string-promisevoid)
      - [`changeOptions(newOptions: MediaStreamConstraints): Promise<void>`](#changeoptionsnewoptions-mediastreamconstraints-promisevoid)

## Class: Webcam

Represents a webcam utility for managing webcam streams.

### Static Methods

#### `initialize(options: { videoId?: string, webcamOptions?: MediaStreamConstraints }): Promise<Webcam>`

- Initializes the webcam utility asynchronously.
- `options` (Object):
  - `videoId` (String, optional): ID of the HTML video element. Default is 'webcam'.
  - `webcamOptions` (MediaStreamConstraints, optional): Constraints for accessing the webcam stream.
- Returns a Promise that resolves to a `Webcam` instance.

#### `getAll(): Promise<MediaDeviceInfo[]>`

- Retrieves a list of all available webcam devices asynchronously.
- Returns a Promise that resolves to an array of `MediaDeviceInfo` objects representing available webcams.

### Instance Methods

#### `start(): Promise<void>`

- Activates the webcam stream and displays it in the specified video element.

#### `startFront(): Promise<void>`

- Activates the front-facing camera (if available) and starts the webcam stream.

#### `startBack(): Promise<void>`

- Activates the back-facing camera (if available) and starts the webcam stream.

#### `stop(): void`

- Deactivates the webcam stream and stops all tracks associated with it.

#### `changeByDevice(device: MediaDeviceInfo): Promise<void>`

- Changes the active webcam device based on the provided `MediaDeviceInfo`.
- `device` (MediaDeviceInfo): The webcam device to switch to.

#### `changeByLabel(label: string): Promise<void>`

- Changes the active webcam device based on the label of the device.
- `label` (String): The label of the webcam device to switch to.

#### `changeOptions(newOptions: MediaStreamConstraints): Promise<void>`

- Changes the options for accessing the webcam stream.
- `newOptions` (MediaStreamConstraints): New constraints to be applied to the webcam stream.