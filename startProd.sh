#!/bin/bash

export SECRET_KEY=secret
# might be necessary to wait for cloud connection to be made before the next step
sleep 5

# this starts the web server
gunicorn3 --workers 2 -b 0.0.0.0:8080 wsgi:app
