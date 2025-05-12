import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  // Мокируем только нужные функции
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index'); // Восстановим оригинальные импорты после всех тестов
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log'); // Подслушиваем вызовы console.log

    mockOne();
    mockTwo();
    mockThree();

    // Проверяем, что все замокированные функции не выводят в консоль
    expect(consoleSpy).not.toHaveBeenCalledWith('foo');
    expect(consoleSpy).not.toHaveBeenCalledWith('bar');
    expect(consoleSpy).not.toHaveBeenCalledWith('baz');

    consoleSpy.mockRestore(); // Восстанавливаем spy
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log'); // Подслушиваем вызовы console.log

    unmockedFunction();

    // Проверяем, что unmockedFunction выводит в консоль
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    consoleSpy.mockRestore(); // Восстанавливаем spy
  });
});
