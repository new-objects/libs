import { describe, expect, it } from 'vitest';
import { mergeObjects } from '../lib/utils';

describe('Testing mergeObjects()', () => {
  const testKey1 = { key: 1 };
  const testKey2 = { key2: 2 };
  const testVideoTrue = { video: true };
  const testArray = { video: [1, 2, 3] };
  const testVideoDevice = { video: { deviceId: 1 } };
  const testVideoResolution720p = { video: { width: 1280, height: 720 } };
  const testVideoResolution1080p = { video: { width: 1920, height: 1080 } };
  // const testVideoFull = { video: { width: 800, height: 600, deviceId: 2 } };

  it('identity of merging a object with an empty object', () => {
    expect(mergeObjects(testKey1, {})).toEqual(testKey1);
  });

  it('merge two objects without shared keys', () => {
    expect(mergeObjects(testKey1, testKey2)).toEqual({ key: 1, key2: 2 });
  });

  it('update existing values (720p->1080p)', () => {
    const result = mergeObjects(
      testVideoResolution720p,
      testVideoResolution1080p,
    );
    expect(result).toEqual(testVideoResolution1080p);
  });

  it('update existing values reverse direction (1080p->720p)', () => {
    const result = mergeObjects(
      testVideoResolution1080p,
      testVideoResolution720p,
    );
    expect(result).toEqual(testVideoResolution720p);
  });

  it('add a property to a mutually shared key (adding deviceId, keeping the rest', () => {
    const result = mergeObjects(testVideoResolution720p, testVideoDevice);
    const assertion = { video: { width: 1280, height: 720, deviceId: 1 } };

    expect(result).toEqual(assertion);
  });

  it('replace a property to a mutually shared key, IF the value of the shared key is NOT of type object', () => {
    const result = mergeObjects(testVideoTrue, testVideoResolution720p);

    expect(result).toEqual(testVideoResolution720p);
  });

  it('test if array values are treated like primitives', () => {
    const result = mergeObjects(testArray, testVideoResolution720p);

    expect(result).toEqual(testVideoResolution720p);
  });

  it('test if arrays values are treated like primitives (reverse)', () => {
    const result = mergeObjects(testVideoResolution720p, testArray);

    expect(result).toEqual(testArray);
  });
});
