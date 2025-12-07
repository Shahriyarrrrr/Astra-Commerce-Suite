#!/bin/bash
cd "$(dirname "$0")/.."
npm install
node server/server.js
