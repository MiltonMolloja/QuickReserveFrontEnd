#!/bin/sh
set -e

# Generate runtime config from environment variables
# This allows configuring the Angular app without rebuilding
cat > /usr/share/nginx/html/assets/config.json <<EOF
{
  "apiBaseUrl": "${API_URL}"
}
EOF

echo "Runtime config generated:"
cat /usr/share/nginx/html/assets/config.json

# Start nginx
exec nginx -g 'daemon off;'
