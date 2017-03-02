#!/bin/bash

set -e

npm run clear 
npm run lint

npm run restart

export NODE_ENV=dev 
webpack --display-error-details --watch