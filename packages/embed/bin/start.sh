#!/bin/bash

set -e

nokit start --name $npm_package_name -p $npm_package_dev_port --config server -e local