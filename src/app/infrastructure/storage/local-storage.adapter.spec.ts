import { LocalStorageAdapter } from './local-storage.adapter';

describe('LocalStorageAdapter', () => {
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    adapter = new LocalStorageAdapter();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('set', () => {
    it('should store a string value as JSON', () => {
      adapter.set('key', 'value');
      expect(localStorage.getItem('key')).toBe('"value"');
    });

    it('should store an object as JSON', () => {
      adapter.set('obj', { a: 1 });
      expect(localStorage.getItem('obj')).toBe('{"a":1}');
    });

    it('should store a number as JSON', () => {
      adapter.set('num', 42);
      expect(localStorage.getItem('num')).toBe('42');
    });
  });

  describe('get', () => {
    it('should return null for non-existent key', () => {
      expect(adapter.get('missing')).toBeNull();
    });

    it('should return parsed JSON object', () => {
      localStorage.setItem('obj', '{"a":1}');
      expect(adapter.get('obj')).toEqual({ a: 1 });
    });

    it('should return parsed string', () => {
      localStorage.setItem('str', '"hello"');
      expect(adapter.get('str')).toBe('hello');
    });

    it('should return raw string if JSON parse fails', () => {
      localStorage.setItem('raw', 'not-json');
      expect(adapter.get('raw')).toBe('not-json');
    });
  });

  describe('remove', () => {
    it('should remove a stored key', () => {
      localStorage.setItem('key', '"value"');
      adapter.remove('key');
      expect(localStorage.getItem('key')).toBeNull();
    });
  });
});
