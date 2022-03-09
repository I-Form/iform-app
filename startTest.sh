#!/bin/bash

export SECRET_KEY=$(python3 -c 'import os; print(os.urandom(16).hex())')

# this starts the web server
export FLASK_APP=api/api.py
export FLASK_ENV=development
flask run

wait
