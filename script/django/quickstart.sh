#!bin/bash

# this script is a quickstart fot django server.

alias pm='python3 manage.py'
alias pmr='python3 manage.py runserver'
pm makemigrations
pm migrate
printf 'yes\n' | pm collectstatic

pm runserver