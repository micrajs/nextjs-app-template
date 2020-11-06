import { classNames } from 'helpers/classNames';

describe('classNames tests', () => {
  it('should return the class name if the arg is a string', () => {
    expect(classNames('my-class')).toBe('my-class');
  });

  it('should join multiple class names into a single string', () => {
    expect(classNames('class1', 'class2')).toBe('class1 class2');
  });

  it('should return the key if object value is truthy', () => {
    expect(
      classNames({
        'my-class': true,
        'not-valid-class': false,
      }),
    ).toBe('my-class');
  });
});
