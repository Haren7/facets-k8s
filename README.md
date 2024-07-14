# facets-k8s

1. Kubectl yml deployment

  Setup 
  
  minikube start --driver=docker
  
  minikube addons enable ingress
  
  minikube addons enable ingress-dns
  
  Deployment
  
  For every yaml file run: kubectl create -f filename.yml
  
  Testing
  
  minikube service blue-app
  
  minikube service green-app

2. Terraform deployment

setup cdktf: https://developer.hashicorp.com/terraform/cdktf

npm install

cdktf deploy
