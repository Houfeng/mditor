#!/bin/bash

set -e

npm run clear 
npm run lint

webpack --display-error-details