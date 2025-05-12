import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2000);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(2000);

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const fakeJoin = jest.spyOn(path, 'join');
  const fakeExistsSync = jest.spyOn(fs, 'existsSync');
  const fakeReadFile = jest.spyOn(fsPromises, 'readFile');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    fakeExistsSync.mockReturnValue(false);
    fakeJoin.mockImplementation((...paths: string[]) => paths.join('/'));

    await readFileAsynchronously('someFile.txt');

    expect(fakeJoin).toHaveBeenCalledWith(__dirname, 'someFile.txt');
  });

  test('should return null if file does not exist', async () => {
    fakeExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
    expect(fakeReadFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    fakeExistsSync.mockReturnValue(true);
    fakeReadFile.mockResolvedValue(Buffer.from('Hello world!'));

    const result = await readFileAsynchronously('exists.txt');

    expect(fakeReadFile).toHaveBeenCalled();
    expect(result).toBe('Hello world!');
  });
});
