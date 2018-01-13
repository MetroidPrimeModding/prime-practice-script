#!/usr/bin/env bash
export DEV_MODE=false
export OUTPUT_PATH=../mp1/files/

if [[ -z ${NOWATCH} ]]; then
  npx webpack
else
  npx webpack --watch
fi
