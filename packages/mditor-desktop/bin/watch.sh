#!/bin/bash

set -e

npm run clear 
npm run lint

export NODE_ENV=dev 
webpack --display-error-details --watch