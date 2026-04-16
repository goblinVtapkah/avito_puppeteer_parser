#!/bin/sh

echo "Build parser service code..."

npm run build

echo "Starting parser service..."

npm run prod

echo "Stopping parser service..."