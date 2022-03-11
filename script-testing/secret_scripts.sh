#!bin/bash
# Create password as secret and output it into a file
SECRET_NAME=my-password
SECRET_KEY=password
SECRET_VALUE=$(echo $RANDOM | md5sum | head -c 20; echo;) # Random 20 char long string

(kubectl delete secret $SECRET_NAME || true) && kubectl create secret generic $SECRET_NAME --from-literal=$SECRET_KEY=$SECRET_VALUE
echo $SECRET_VALUE > ./secret.txt