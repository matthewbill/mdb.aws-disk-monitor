/**
 * @copyright Matthew Bill
 */

const AWS = require('aws-sdk');

/**
 * Class representing a metrics service.
 */
class CloudWatchWrapper {
  constructor(region, logger) {
    const self = this;
    self.cloudWatch = new AWS.CloudWatch({ apiVersion: '2010-08-01', region });
    self.logger = logger;
  }

  putMetrics(metrics) {
    const self = this;
    return new Promise((resolve, reject) => {
      resolve();
      self.cloudWatch.putMetricData(metrics, (err, data) => {
        if (err) {
          self.logger.error(`Error emitting metrics ${err}`);
          reject(err);
        } else {
          self.logger.info('Metrics Emitted Successfully.', data);
          resolve();
        }
      });
    });
  }
}

module.exports = CloudWatchWrapper;
