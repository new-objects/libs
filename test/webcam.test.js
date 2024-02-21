import { describe, expect, it, vi } from 'vitest';
import { Webcam } from '../lib/web/webcam';

describe('Testing Webcam class', () => {
  // Throws an error if there is no support for webcams
  it('should throw an error if there is no support for webcams', async () => {
    const options = { videoId: 'webcam', webcamOptions: { video: true } };
    Object.defineProperty(navigator, 'mediaDevices', {
      value: { getMediaDevices: vi.fn().mockResolvedValueOnce({}) },
    });

    await expect(Webcam.initialize(options)).rejects.toThrowError(
      'No support for webcams detected. Quit.',
    );
  });
});
