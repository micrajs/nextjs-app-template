import { cookieParser } from '../cookieParser';

describe('cookieParser tests', () => {
  it('should return empty if there are no cookies defined', () => {
    const cookie = cookieParser('');

    expect(cookie).toMatchObject([]);
  });

  it('should parse a basic cookie', () => {
    const cookie = cookieParser('foo=bar');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
      },
    ]);
  });

  it('should parse a multiple cookies', () => {
    const cookie = cookieParser('foo    = bar;   baz  =   raz');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
      },
      {
        name: 'baz',
        value: 'raz',
      },
    ]);
  });

  it('should accept quoted values', () => {
    const cookie = cookieParser('foo="bar=123456789&name=Magic+Mouse"');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar=123456789&name=Magic+Mouse',
      },
    ]);
  });

  it('should parse special characters', () => {
    const cookie = cookieParser('email=%20%22%2c%3b%2f');

    expect(cookie).toMatchObject([
      {
        name: 'email',
        value: ' ",;/',
      },
    ]);
  });

  it('should ignore escaping errors', () => {
    const cookie = cookieParser('foo=%1');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: '%1',
      },
    ]);
  });

  it('should ignore non-values', () => {
    const cookie = cookieParser('foo');

    expect(cookie).toMatchObject([]);
  });

  it('should parse the domain attribute', () => {
    const cookie = cookieParser('foo=bar; Domain=example.com');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        domain: 'example.com',
      },
    ]);
  });

  it('should parse the expires attribute', () => {
    const cookie = cookieParser('foo=bar; Expires=Sun, 24 Dec 2000 10:30:59 GMT');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        expires: new Date('Sun, 24 Dec 2000 10:30:59 GMT'),
      },
    ]);
  });

  it('should parse the max age attribute', () => {
    const cookie = cookieParser('foo=bar; Max-Age=1000');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        maxAge: 1000,
      },
    ]);
  });

  it('should parse the httpOnly attribute', () => {
    const cookie = cookieParser('foo=bar; HttpOnly');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        httpOnly: true,
      },
    ]);
  });

  it('should parse the path attribute', () => {
    const cookie = cookieParser('foo=bar; Path=/mydir');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        path: '/mydir',
      },
    ]);
  });

  it('should parse the secure attribute', () => {
    const cookie = cookieParser('foo=bar; Secure');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        secure: true,
      },
    ]);
  });

  it('should parse the Strict same site attribute', () => {
    const cookie = cookieParser('foo=bar; SameSite=Strict');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        sameSite: 'strict',
      },
    ]);
  });

  it('should parse the None same site attribute', () => {
    const cookie = cookieParser('foo=bar; SameSite=None');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
        sameSite: 'none',
      },
    ]);
  });

  it('should parse the Lax same site attribute', () => {
    const cookie = cookieParser('foo=bar; SameSite=Lax');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
      },
    ]);
  });

  it('should ignore invalid same site attribute', () => {
    const cookie = cookieParser('foo=bar; SameSite=RANDOM');

    expect(cookie).toMatchObject([
      {
        name: 'foo',
        value: 'bar',
      },
    ]);
  });
});
