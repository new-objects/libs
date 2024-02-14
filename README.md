# Introduction

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repo collects pieces of code (classes, functions, data structures) that we'd like to re-use in future projects.

## Usage

To use this library, install it with _npm_

`npm i @new-objects/libs`

and then import the code you'd like to use.

Example:

```js
import { Webcam } from '@new-objects/libs';
```


## Project Structure
```
    ├── lib
    |   ├── mediapipe
    |   |   ├── hand-tracking.js
    │   |   web
    │   |   ├── webcam.js
    ├── package.json
```

## Examples

At the moment we have two examples, showing use-cases for this lib:
1. hand-tracking
2. webcam

To have a go and look at them, simply start examples.
```shell
npm run examples
```


## Testing

TBD