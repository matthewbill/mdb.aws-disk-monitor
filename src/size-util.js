/**
 * @copyright Matthew Bill
 */


/**
 * Class representing a disk service.
 */
class SizeUtil {
  static bytesToGigabytes(bytes) {
    // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 0;
    return (bytes / (1024 ** 3)).toFixed(2);
  }
}

module.exports = SizeUtil;
