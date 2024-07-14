# facets-k8s

#1. Kubectl yml deployment

##Setup 
minikube start --driver=docker
minikube addons enable ingress
minikube addons enable ingress-dns

##Deployment
For every yaml file run: kubectl create -f <filename>

##Testing
minikube service blue-app

minikube service green-app
