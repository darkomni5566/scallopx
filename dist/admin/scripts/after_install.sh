#!/bin/bash

# get all the variables
APPLICATION_NAME="admin"
DESTINATION_PATH="/opt/bitnami/projects/admin"

# create /server/uploads if it doesn't exist
cd $DESTINATION_PATH

#This linking might be required if script falis to
#detect node in /usr/bin/env
#ln -s /opt/bitnami/node/bin/node /usr/bin/node
#/opt/bitnami/node/bin/npm install
#/opt/bitnami/node/bin/npm install -g create-react-app@latest
#/opt/bitnami/node/bin/npm run build
# create /webapps/logs if it doesn't exist

# copy certs if they don't exist