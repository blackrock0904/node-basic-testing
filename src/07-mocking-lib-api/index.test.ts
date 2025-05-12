import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios'); // Мокаем axios

describe('throttledGetDataFromApi', () => {
  const mockResponse = { data: 'some data' };
  const mockGet = jest.fn().mockResolvedValue(mockResponse);

  beforeEach(() => {
    axios.create = jest.fn().mockReturnValue({ get: mockGet });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toBe(mockResponse.data);
  });

  test('should throttle requests to prevent multiple calls within throttle time', async () => {
    const throttledFn = throttledGetDataFromApi;

    // Вызываем несколько раз, но запрос должен быть заблокирован после первой попытки
    throttledFn('/posts/1');
    throttledFn('/posts/2');

    // Убедимся, что mockGet был вызван только один раз
    await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем, чтобы таймеры сработали
    expect(mockGet).toHaveBeenCalledTimes(1);
  });
});
