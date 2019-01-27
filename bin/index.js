#!/usr/bin/env node
/**
 * @copyright Matthew Bill
*/

const figlet = require('figlet');
const program = require('commander');
const winston = require('winston');

const AwsDiskMonitor = require('../src/aws-disk-monitor.js');
const AwsDiskService = require('../src/aws-disk-service.js');

program
  .version('0.1.0')
  .option('-p, --paths <value>', 'Comma separated list of disk paths. i.e.: c:/,d:/.')
  .option('-o, --org <value>', 'The organisation name used for the CloudWatch metrics namespace.')
  .option('-n, --serverName <value>', 'The name of the server the metrics are for and used for the CloudWatch metrics namespace.')
  .option('-d, --delay <n>', 'The delay in milliseconds in which to send the data continuously.', parseInt)
  .option('-r, --region <value>', 'The AWS Region. i.e.: us-east-1.')
  .parse(process.argv);

const {
  paths,
  org,
  serverName,
} = program;

let { delay, region } = program;
if (!delay) {
  delay = 60000;
}

if (!region) {
  region = 'us-east-1';
}

// eslint-disable-next-line no-console
console.log(figlet.textSync('AWS Disk Monitor', {}));

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.cli(),
  transports: [
    new (winston.transports.Console)(),
  ],
});

logger.info(`DISK_PATHS: ${paths}`);
logger.info(`ORG: ${org}`);
logger.info(`SERVER_NAME: ${serverName}`);

function isParamsValid() {
  logger.debug('Validating params');
  let valid = true;
  if (paths === undefined) {
    logger.error('DISK_PATH not defined.');
    valid = false;
  }

  if (org === undefined) {
    logger.error('ORG not defined.');
    valid = false;
  }

  if (serverName === undefined) {
    logger.error('NAME not defined.');
    valid = false;
  }
  return valid;
}

if (isParamsValid()) {
  logger.info('Starting');
  const diskPathsArray = paths.split(',');

  const awsDiskService = new AwsDiskService(org,
    serverName, diskPathsArray, region, logger);

  const awsDiskMonitor = new AwsDiskMonitor(delay, awsDiskService, logger);
  awsDiskMonitor.start();
} else {
  logger.error('Params not valid.');
}
