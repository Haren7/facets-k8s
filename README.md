# facets-k8s
Cluster setup: minikube start --driver=virtualbox --no-vtx-check --addons=ingress

edit etc/hosts to map the minikube ip to bluegreenapp.com

1. Kubectl yml deployment
  
  Deployment
  
  For every yaml file run: kubectl create -f filename.yml
  
  Testing
  
  kubectl run curl --image=appropriate/curl --restart=Never --rm -it -- curl http://bluegreenapp.com

  OR

  bluegreenapp.com in the browser

2. Terraform deployment

setup cdktf: https://developer.hashicorp.com/terraform/cdktf

npm install

cdktf deploy

Testing
  
  kubectl run curl --image=appropriate/curl --restart=Never --rm -it -- curl http://bluegreenapp.com

  OR

  bluegreenapp.com in the browser
