/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookieEncoder } from '../cookieEncoder';

describe('cookieEncoder tests', () => {
  it('should encode a basic cookie', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
    });

    expect(cookie).toBe('foo=bar');
  });

  it('should encode a basic cookie with whitespaces in the value', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar baz',
    });

    expect(cookie).toBe('foo=bar%20baz');
  });

  it('should throw if the name is invalid', () => {
    expect(() =>
      cookieEncoder({
        name: 'foo\n',
        value: 'bar',
      }),
    ).toThrow();
  });

  it('should throw if the value is invalid', () => {
    expect(() =>
      cookieEncoder({
        name: 'foo',
        value: 'bar\n',
      }),
    ).toThrow();
  });

  it('should encode the Path attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      path: '/',
    });

    expect(cookie).toBe('foo=bar; Path=/');
  });

  it('should throw if the Path attribute is invalid', () => {
    expect(() =>
      cookieEncoder({
        name: 'foo',
        value: 'bar',
        path: '/\n',
      }),
    ).toThrow();
  });

  it('should encode the Secure attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      httpOnly: false,
      secure: true,
    });

    expect(cookie).toBe('foo=bar; Secure');
  });

  it('should encode the Domain attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      domain: 'example.com',
    });

    expect(cookie).toBe('foo=bar; Domain=example.com');
  });

  it('should throw if the Domain attribute is invalid', () => {
    expect(() =>
      cookieEncoder({
        name: 'foo',
        value: 'bar',
        domain: 'example.com\n',
      }),
    ).toThrow();
  });

  it('should encode the HttpOnly attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      httpOnly: true,
      secure: false,
    });

    expect(cookie).toBe('foo=bar; HttpOnly');
  });

  it('should encode the Max-Age attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      maxAge: 1000,
    });

    expect(cookie).toBe('foo=bar; Max-Age=1000');
  });

  it('should encode a zero-valued Max-Age attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      maxAge: 0,
    });

    expect(cookie).toBe('foo=bar; Max-Age=0');
  });

  it('should encode a round the Max-Age attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      maxAge: 3.14,
    });

    expect(cookie).toBe('foo=bar; Max-Age=3');
  });

  it('should ignore a NaN Max-Age attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      maxAge: NaN,
    });

    expect(cookie).toBe('foo=bar');
  });

  it('should ignore a non-finite Max-Age attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      maxAge: Infinity,
    });

    expect(cookie).toBe('foo=bar');
  });

  it('should encode the Expires attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      expires: new Date(Date.UTC(2020, 11, 24, 10, 30, 59, 900)),
    });

    expect(cookie).toBe('foo=bar; Expires=Thu, 24 Dec 2020 10:30:59 GMT');
  });

  it('should ignore an invalid Expires attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      expires: Date.now() as any,
    });

    expect(cookie).toBe('foo=bar');
  });

  it('should encode the Strict SameSite attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      sameSite: 'strict',
    });

    expect(cookie).toBe('foo=bar; SameSite=Strict');
  });

  it('should encode the Lax SameSite attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      sameSite: 'lax',
    });

    expect(cookie).toBe('foo=bar; SameSite=Lax');
  });

  it('should encode the None SameSite attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      sameSite: 'none',
    });

    expect(cookie).toBe('foo=bar; SameSite=None');
  });

  it('should ignore an invalid SameSite attribute', () => {
    const cookie = cookieEncoder({
      name: 'foo',
      value: 'bar',
      sameSite: 'some random value' as any,
    });

    expect(cookie).toBe('foo=bar');
  });
});
