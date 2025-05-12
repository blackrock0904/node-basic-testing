import { simpleCalculator, Action } from './index';

describe('simpleCalculator (table tests)', () => {
  test.each([
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 4, action: Action.Multiply, expected: 12 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: '2', b: 2, action: Action.Add, expected: null },
    { a: 2, b: '2', action: Action.Add, expected: null },
    { a: 2, b: 2, action: '%', expected: null },
    { a: 2, b: 2, action: undefined, expected: null },
    { a: null, b: 2, action: Action.Subtract, expected: null },
  ])('returns $expected for a=$a, b=$b, action=$action', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
