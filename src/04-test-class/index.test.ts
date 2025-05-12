import {
  getBankAccount,
  TransferFailedError,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(100);
    expect(() => acc.withdraw(150)).toThrow(InsufficientFundsError);
    expect(() => acc.withdraw(150)).toThrow('Insufficient funds: cannot withdraw more than 100');
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(50);
    expect(() => acc1.transfer(200, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(50, acc)).toThrow(TransferFailedError);
    expect(() => acc.transfer(50, acc)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(100);
    acc.withdraw(30);
    expect(acc.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(50);

    acc1.transfer(40, acc2);

    expect(acc1.getBalance()).toBe(60);
    expect(acc2.getBalance()).toBe(90);
  });

  test('fetchBalance should return number if request did not fail', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(acc as any, 'fetchBalance').mockResolvedValue(75);
    const value = await acc.fetchBalance();
    expect(value).toBe(75);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(acc as any, 'fetchBalance').mockResolvedValue(42);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(acc as any, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    await expect(acc.synchronizeBalance()).rejects.toThrow('Synchronization failed');
  });
});
