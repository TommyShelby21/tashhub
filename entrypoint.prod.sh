#!/bin/sh
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Starting Gunicorn..."
python -m gunicorn --bind 0.0.0.0:1000 backend.wsgi:application