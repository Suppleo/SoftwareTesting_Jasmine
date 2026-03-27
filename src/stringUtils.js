class StringUtils {
  capitalize(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    if (str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  reverse(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.split('').reverse().join('');
  }

  isPalindrome(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  truncate(str, maxLength) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }

  countWords(str) {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  delayedUpperCase(str, callback) {
    setTimeout(() => {
      callback(str.toUpperCase());
    }, 1000);
  }
}

module.exports = StringUtils;
