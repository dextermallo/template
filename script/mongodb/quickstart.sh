#!bin/bash

# this script is to help you restart mongodb.

GREEN='\033[0;32m'
NC='\033[0m'

# if you don't have log path, skip with blankspace.
echo "Enter your ${GREEN}MongoDB log path${NC}:"
read LOG_PATH

# force to close mongo default port.
pid=$(lsof -i:27017 -t)
kill -TERM $pid || kill -KILL $pid

# Restart mongodb.
mongod --fork --logpath $LOG_PATH/mongodb.log --dbpath $LOG_PATH/mongodb