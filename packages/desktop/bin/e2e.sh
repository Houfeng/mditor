#!/bin/bash

set -e

npm run build 
npm restart 

JASMINE_CONFIG_PATH=$PWD/jasmine.json jasmine