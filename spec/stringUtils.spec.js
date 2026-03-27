const StringUtils = require('../src/stringUtils');

describe('StringUtils', () => {
  let utils;

  // beforeAll: chay 1 lan truoc tat ca tests trong describe
  beforeAll(() => {
    console.log('--- START StringUtils tests ---');
  });

  // afterAll: chay 1 lan sau tat ca tests
  afterAll(() => {
    console.log('--- END StringUtils tests ---');
  });

  beforeEach(() => {
    utils = new StringUtils();
  });

  // ========================
  // BASIC TESTS
  // ========================
  describe('capitalize()', () => {
    it('should capitalize first letter', () => {
      expect(utils.capitalize('hello')).toBe('Hello');
    });

    it('should return empty string for empty input', () => {
      expect(utils.capitalize('')).toBe('');
    });

    it('should throw for non-string input', () => {
      expect(() => utils.capitalize(123)).toThrowError('Input must be a string');
    });
  });

  describe('reverse()', () => {
    it('should reverse a string', () => {
      expect(utils.reverse('abc')).toBe('cba');
    });

    it('should handle single character', () => {
      expect(utils.reverse('x')).toBe('x');
    });
  });

  // ========================
  // DISABLED TESTS: xit va xdescribe
  // ========================
  // xdescribe: bo qua toan bo group nay
  xdescribe('(SKIPPED) future features', () => {
    it('this test will not run', () => {
      expect(true).toBe(false); // se khong chay
    });
  });

  describe('isPalindrome()', () => {
    it('should detect palindrome', () => {
      expect(utils.isPalindrome('racecar')).toBe(true);
    });

    it('should ignore case and spaces', () => {
      expect(utils.isPalindrome('A man a plan a canal Panama')).toBe(true);
    });

    it('should return false for non-palindrome', () => {
      expect(utils.isPalindrome('hello')).toBe(false);
    });

    // xit: bo qua 1 test duy nhat
    xit('(SKIPPED) should handle unicode', () => {
      // chua implement, danh dau pending
      expect(utils.isPalindrome('àbà')).toBe(true);
    });
  });

  // ========================
  // CUSTOM MATCHERS
  // ========================
  describe('truncate() with custom matcher', () => {
    beforeEach(() => {
      // Tao custom matcher
      jasmine.addMatchers({
        toEndWith: () => ({
          compare: (actual, expected) => ({
            pass: actual.endsWith(expected),
            message: `Expected "${actual}" to end with "${expected}"`
          })
        })
      });
    });

    it('should truncate long strings with "..."', () => {
      const result = utils.truncate('Hello World', 5);
      expect(result).toBe('Hello...');
      // Su dung custom matcher
      expect(result).toEndWith('...');
    });

    it('should not truncate short strings', () => {
      const result = utils.truncate('Hi', 10);
      expect(result).toBe('Hi');
      expect(result).not.toEndWith('...');
    });
  });

  // ========================
  // jasmine.clock(): test timer/setTimeout
  // ========================
  describe('delayedUpperCase() with jasmine.clock', () => {
    beforeEach(() => {
      jasmine.clock().install(); // thay the setTimeout that
    });

    afterEach(() => {
      jasmine.clock().uninstall(); // phuc hoi setTimeout goc
    });

    it('should call callback after 1 second', () => {
      const callback = jasmine.createSpy('callback');

      utils.delayedUpperCase('hello', callback);

      // Chua toi 1s -> callback chua duoc goi
      expect(callback).not.toHaveBeenCalled();

      // Tua thoi gian toi 1s
      jasmine.clock().tick(1000);

      // Bay gio callback da duoc goi
      expect(callback).toHaveBeenCalledWith('HELLO');
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  // ========================
  // countWords() + jasmine.arrayContaining
  // ========================
  describe('countWords()', () => {
    it('should count words correctly', () => {
      expect(utils.countWords('hello world')).toBe(2);
      expect(utils.countWords('  spaced   out  ')).toBe(2);
    });

    it('should return 0 for empty/whitespace string', () => {
      expect(utils.countWords('')).toBe(0);
      expect(utils.countWords('   ')).toBe(0);
    });

    it('demo jasmine.arrayContaining', () => {
      const words = ['hello', 'world', 'foo', 'bar'];
      expect(words).toEqual(
        jasmine.arrayContaining(['foo', 'hello'])
      );
      expect(words).not.toEqual(
        jasmine.arrayContaining(['baz'])
      );
    });
  });
});
