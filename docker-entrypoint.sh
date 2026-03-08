#!/bin/sh
set -e

# Replace only $API_URL in the nginx template, preserving all nginx variables
envsubst '$API_URL' < /etc/nginx/nginx-template.conf > /etc/nginx/conf.d/default.conf

echo "=== Generated nginx config ==="
cat /etc/nginx/conf.d/default.conf
echo "=== End nginx config ==="

# Test nginx config before starting
nginx -t

# Start nginx in foreground
exec nginx -g 'daemon off;'
