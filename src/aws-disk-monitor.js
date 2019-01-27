/**
 * @copyright Matthew Bill
 */

/**
 * Class representing a disk service.
 */
class AwsDiskMonitor {
  constructor(delay, awsDiskService, logger) {
    const self = this;
    self.delay = delay;
    self.running = false;
    self.logger = logger;
    self.awsDiskService = awsDiskService;
  }

  start() {
    const self = this;
    self.logger.info('Starting');
    self.running = true;
    self.monitorDisks(self);
  }

  stop() {
    const self = this;
    self.logger.info('Stopping');
    self.running = false;
  }

  // eslint-disable-next-line class-methods-use-this
  monitorDisks(awsDiskMonitor) {
    const self = awsDiskMonitor;
    self.awsDiskService.checkDisks().then(() => {
      if (self.running) {
        setTimeout(self.monitorDisks, awsDiskMonitor.delay, awsDiskMonitor);
      }
    }).catch((reason) => {
      self.logger.error(reason);
      self.running = false;
      throw new Error(reason);
    });
  }
}

module.exports = AwsDiskMonitor;
