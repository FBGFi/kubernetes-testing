#!bin/bash
# Testing script for creating all deployments in directory
FILES=$(ls kuber-*.yaml)

# Create all in current dir
for FILE in $FILES; do
  kubectl create -f $FILE
done

# Delete all in current dir
for FILE in $FILES; do
  kubectl delete -f $FILE
done