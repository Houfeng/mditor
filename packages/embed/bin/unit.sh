#!/bin/bash

set -e

npm run lint 

karma start karma.conf.js --single-run 
cat ./build/coverage/report-text/text-summary.txt 

echo ''
echo 'Coverage Detail: ./build/coverage/report-html/index.html'
echo ''