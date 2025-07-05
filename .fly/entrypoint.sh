#!/usr/bin/env sh

# chown -R www-data:www-data /var/www/html

echo "Running user scripts"

# Run user scripts, if they exist
for f in /var/www/html/.fly/scripts/*.sh; do
    # Bail out this loop if any script exits with non-zero status code
    bash "$f" -e
done

echo "Starting supervisord"

# if [ $# -gt 0 ]; then
#     # If we passed a command, run it as root
#     exec "$@"
# else
#     exec supervisord -c /etc/supervisor/supervisord.conf
# fi

exec supervisord -c /etc/supervisor/supervisord.conf
