import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Тест с использованием toStrictEqual для сравнения структуры
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const result = generateLinkedList(elements);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    });
  });

  // Тест с использованием snapshot
  test('should generate linked list from values 2', () => {
    const elements = [4, 5, 6];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
