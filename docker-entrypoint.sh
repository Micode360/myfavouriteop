#!/bin/bash
set -e

# Start MongoDB
mongod &

# Wait for MongoDB to start
until mongo --eval 'db.runCommand({ ping: 1 })' &>/dev/null; do
  echo "Waiting for MongoDB to start"
  sleep 1
done

# Start the Node.js server
cd /usr/src/app
yarn start

