import { deepMerge } from '..';

describe('deepMerge tests', () => {
  it('should replace a number', () => {
    const target = { a: 12 };
    const overwrite = { a: 42 };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: 42 });
  });
  it('should replace a string', () => {
    const target = { a: '12' };
    const overwrite = { a: '42' };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: '42' });
  });
  it('should replace a boolean', () => {
    const target = { a: true };
    const overwrite = { a: false };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: false });
  });
  it('should replace an undefined', () => {
    const target = { a: undefined };
    const overwrite = { a: null };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: null });
  });
  it('should replace a null', () => {
    const target = { a: null };
    const overwrite = { a: 123 };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: 123 });
  });
  it('should merge an array', () => {
    const target = { a: [1] };
    const overwrite = { a: [2] };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: [2] });
  });
  it('should merge an object', () => {
    const target = { a: { b: 1 } };
    const overwrite = { a: { c: 2 } };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: { b: 1, c: 2 } });
  });
  it('should merge a deep nested object', () => {
    const target = { a: { b: { c: 12 } } };
    const overwrite = { a: { b: { c: 42 } } };

    expect(deepMerge(target, overwrite)).toMatchObject({ a: { b: { c: 42 } } });
  });
});
