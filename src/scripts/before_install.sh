#!/bin/bash

# get all the variables
APPLICATION_NAME="admin"
DESTINATION_PATH="/opt/bitnami/projects/admin"

# check if the application folder exists
if [ ! -d "$DESTINATION_PATH" ]; then
  mkdir $DESTINATION_PATH
fi

# delete /node_modules folder if it exists,
# so there are no old/unused files/assets
if [ -d "$DESTINATION_PATH/node_modules" ]; then
  rm -Rf $DESTINATION_PATH/node_modules
fi

# delete /dev folder if it exists,
# so there are no old/unused files/assets
#if [ -d "$DESTINATION_PATH/dev" ]; then
  #rm -Rf $DESTINATION_PATH/dev
#fi

# delete /public folder if it exists,
# so there are no old/unused files/assets
if [ -d "$DESTINATION_PATH/public" ]; then
  rm -Rf $DESTINATION_PATH/public
fi