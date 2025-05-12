import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments (non-number a)', () => {
    const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments (non-number b)', () => {
    const result = simpleCalculator({ a: 2, b: null, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for missing fields', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: undefined });
    expect(result).toBeNull();
  });
});
