#!bin/bash

# this script is used as a script to create a .env file when developing LINE bot service.

GREEN='\033[0;32m'
NC='\033[0m'

echo "Enter your ${GREEN}LINE Channel Access Token${NC}:"
read line_channel_access_token
echo "Enter your ${GREEN}LINE Channel Secret${NC}:"
read line_channel_secret
echo "Enter your ${GREEN}DynamoDB ARN${NC}:"
read dynamodb_arn

echo LINE_CHANNEL_ACCESS_TOKEN=$line_channel_access_token > .env
echo LINE_CHANNEL_SECRET=$line_channel_secret >> .env
echo DYNAMODB_ARN=$dynamodb_arn >> .env