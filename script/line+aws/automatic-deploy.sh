# This is a script to speedup deployment of LINE bot service with a backend service,
# 1. follow with this structure:
#
# proj
# |
# |- Line Bot Service
# |    |- ... (other files)
# |    |- serverless.yml
# |
# |- Backend Service
# |    |- ... (other files)
# |    |- Dockerfile
# |    |- docker-compose.yml

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "Enter your ${GREEN}Serverless Service Path${NC}:"
read SLS_PATH

# sls deploy
cd $SLS_PATH
sls deploy
echo "Update lambda service complete."

# ec2 deploy

PKG=backend_service

cd ..
echo "Enter your ${GREEN}Backend Service Path${NC}:"
read BACKEND_SERVICE_PATH
tar cvf $PKG.tar BACKEND_SERVICE_PATH
cd BACKEND_SERVICE_PATH


echo "Enter your ${GREEN}EC2 SSH Path${NC}:"
read EC2_PATH

echo "Enter your ${GREEN}SSH Key${NC}:"
read EC2_KEY_PATH

scp -i $EC2_KEY_PATH ../$PKG.tar $EC2_PATH:~/

# usually you will get a permission required for login ssh, manual input option "yes"
ssh -i $EC2_KEY_PATH $EC2_PATH 

# manual input or use pipeline to input in ec2 instance.
tar xvf $PKG.tar
cd $PKG
sudo docker-compose up --build






