# Kubernetes

This repo is just a collection of tips for running Kubernetes with Minikube, nothing of value will be added here.

## Starting guide

To create minikube service - `kubectl create -f <service>.yaml`

Expose the service - `kubectl expose deployment <deployment-name> --name=<service name> --type=<LoadBalancer/NodePort/...>` 

Need to build image to minikube env to run local images with imagePullPolicy present in configuration - `eval $(minikube docker-env)` -> `docker build -t <name> .` -> `kubectl rollout restart deployments/<deploymentname>`

To access the service locally use - `minikube tunnel` -> use designated nodePort

To name Docker container use - `docker run -p <localport>:<nodePort> -d --name <name> <imagename>`

## Notes

Deployment - responsible for keeping pods running
Service - responsible for enabling network to pods

Files are pod exclusive, on rollout they will be replaced

On app crash K8S automatically starts a new pod

## Important commands

Sets the bearer token to env variable (can be used for Authorization header) - `TOKEN=$(kubectl describe secret -n kube-system $(kubectl get secrets -n kube-system | grep default | cut -f1 -d ' ') | grep -E '^token' | cut -f2 -d':' | tr -d '\t' | tr -d " ")`

Gets the API server endpoint (localhost:nodePort) - `APISERVER=$(kubectl config view | grep https | cut -f 2- -d ":" | tr -d " ")`

## Certs

One note here, FOLLOW THE INSTRUCTIONS CAREFULLY

`openssl genrsa -out <name>.key 2048` - Generates 2048 bit key
`openssl req -new -key <name>.key -out <name>.csr` - Generate CSR
`cat <name>.csr | base64 | tr -d '\n','%'` - Print csr to console
`kubectl create -f <name>.yaml` - Create CSR object
`kubectl certificate approve <name>` - Approve csr
`kubectl get csr <name> -o jsonpath='{.status.certificate}' | base64 --decode > <name>.crt` - Create CRT
`kubectl config set-credentials <name> --client-certificate=<name>.crt --client-key=<name>.key` - Set User
`kubectl config set-context <name>-context --cluster=minikube --namespace=<name> --user=<name>` - Create context