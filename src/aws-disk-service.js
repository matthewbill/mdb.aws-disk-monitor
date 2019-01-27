/**
 * @copyright Matthew Bill
 */

const checkDiskSpace = require('check-disk-space');
const MetricsMapper = require('./metrics-mapper.js');
const CloudWatchWrapper = require('./cloudwatch-wrapper.js');
const SizeUtil = require('./size-util.js');

/**
 * Class representing a disk service.
 */
class AwsDiskService {
  constructor(org, serverName, diskPathsArray, region, logger) {
    const self = this;
    self.diskPathsArray = diskPathsArray;
    self.logger = logger;
    self.namespace = `${org}/Servers/${serverName}`;
    self.cloudWatchWrapper = new CloudWatchWrapper(region, logger);
  }

  async checkDisk(path) {
    const self = this;
    self.logger.debug(`Checking disk space: ${path}`);
    try {
      const diskSpace = await checkDiskSpace(path);
      if (!diskSpace.free.isNaN) {
        const size = SizeUtil.bytesToGigabytes(diskSpace.size);
        const free = SizeUtil.bytesToGigabytes(diskSpace.free);
        self.logger.info(`${path} - Size: ${size} GB | Free: ${free}`);
        try {
          const metrics = MetricsMapper.mapDiskToMetrics(self.namespace,
            path, size, free);
          self.logger.debug(`Putting metrics for namespace: ${self.namespace}`);
          await this.cloudWatchWrapper.putMetrics(metrics);
        } catch (error) {
          self.logger.error(`Error checking disk ${path}: ${error}`);
          throw error;
        }
      } else {
        throw new Error(`${path} is not a valid path`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkDisks() {
    const self = this;
    self.logger.debug('checking disks');
    const results = [];
    for (let i = 0; i < self.diskPathsArray.length; i += 1) {
      results.push(self.checkDisk(self.diskPathsArray[i]));
    }
    try {
      await Promise.all(results);
    } catch (error) {
      self.logger.error(error);
    }
  }
}

module.exports = AwsDiskService;
