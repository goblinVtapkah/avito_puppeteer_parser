#!/bin/sh

echo "Building application..."
pnpm run build

echo "Running migrations..."
pnpm run migration:run

echo "Starting nest server..."
pnpm run start:dev


echo "Stopping nest server..."