#!/bin/bash

set -e

export NODE_ENV=mock 

npm run unit
npm run e2e