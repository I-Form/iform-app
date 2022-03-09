#!/bin/bash

# you should make this random
export SECRET_KEY=not_random_bad_key

# this starts the web server
export FLASK_APP=api/api.py
export FLASK_ENV=development
flask run

wait
