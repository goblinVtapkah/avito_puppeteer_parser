#!/bin/sh

echo "Start Web application..."

npx vite --host 0.0.0.0 --port $FRONTEND_PORT

echo "Stopping Web application..."