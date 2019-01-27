# AWS Disk Monitor #

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![GitHub issues](https://img.shields.io/github/issues/matthewbill/nvoy/shields.svg)](https://github.com/matthewbill/aws-disk-monitor/issues)
 ![Travis (.org)](https://img.shields.io/travis/matthewbill/aws-disk-monitor.svg)
 ![npm](https://img.shields.io/npm/v/aws-disk-monitor.svg) ![npm](https://img.shields.io/npm/dt/aws-disk-monitor.svg)

 CLI tool for monitoring disk space and reporting details to AWS CloudWatch. EC2/EBS does not currently publish metrics on the space left on a disk and so this simple, yet useful tool will help you keep track of things. Perfect for a private package server or build server.

## Prerequisites ##

You will need to setup your [AWS Credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) for this tool to work. If you are working with AWS already, you probably already have this set up.

## Install ##

``` bash

npm install aws-disk-monitor -g

```

## Running ##

``` bash

aws-disk-monitor -p C:/,D:/ -n MyServer -o MatthewBill -d 60000 -r us-east-1

```
The above command checks two disks and sends metrics to AWS CloudWatch with the `MatthewBill/Servers/MyServer` namespace.

### Options ###

| Option | Description | Default |
| ------ | ----------- | ------- |
| `-p, --paths <value>` | Comma separated list of disk paths. i.e.: `C:/,D:/`. | |
| `-o, --org <value>` | The organisation name used for the CloudWatch metrics namespace. | |
| `-n, --serverName <value>` | The name of the server the metrics are for and used for the CloudWatch metrics namespace. | |
| `-d, --delay <n>` | The delay in milliseconds in which to send the data continuously. | `60000` |
| `-r, --region <value>` | The AWS Region. i.e.: us-east-1. | `us-east-1` |

## Metrics ##

| Name | Description |
| ------ | ----------- |
| `space` | The total size of the disk. |
| `free` | The free space on the disk. |

### Namespace ###

The namespace is created using the following:

``` js
self.namespace = `${org}/Servers/${serverName}`;
```
### Dimensions ###

The disk path is used as a dimension.

## License ##

Copyright (c) Matthew Bill. All rights reserved.

Licensed under the MIT License.
