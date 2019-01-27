/**
 * @copyright Matthew Bill
 */

class MetricsMapper {
  static mapDiskToMetrics(namespace, path, space, free) {
    const namespaceMetrics = {
      MetricData: [
        {
          MetricName: 'DiskSize',
          Dimensions: [
            {
              Name: 'Path',
              Value: path,
            },
          ],
          Unit: 'Gigabytes',
          Value: space,
        },
        {
          MetricName: 'DiskFree',
          Dimensions: [
            {
              Name: 'Path',
              Value: path,
            },
          ],
          Unit: 'Gigabytes',
          Value: free,
        },
      ],
      Namespace: namespace,
    };
    return namespaceMetrics;
  }
}

module.exports = MetricsMapper;
