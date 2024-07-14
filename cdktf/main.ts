import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import input from './src/input.json';
import { Application } from "./src/interfaces/application";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { DeploymentBuilder } from "./src/resources/deploymentBuilder";
import { ServiceBuilder } from "./src/resources/serviceBuilder";
import { IngressBuilder } from "./src/resources/ingressBuilder";

const applications: Application[] = input["applications"];

class MyStack extends TerraformStack {
  private readonly applications: Application[];
  private readonly deploymentBuilder: DeploymentBuilder;
  private readonly serviceBuilder: ServiceBuilder;
  private readonly ingressBuilder: IngressBuilder;

  constructor(scope: Construct, id: string, applications: Application[]) {
    super(scope, id);
    this.init();
    this.applications = applications;
    this.deploymentBuilder = new DeploymentBuilder(this, `dep`);
    this.serviceBuilder = new ServiceBuilder(this, 'ser');
    this.ingressBuilder = new IngressBuilder(this, 'ing');
  }

  private init() {
    new KubernetesProvider(this, 'k8s', {
      configPath: '~/.kube/config'
    })
  }

  public deploy() {

    for (const application of this.applications) {
      this.deploymentBuilder.build(application);
      this.serviceBuilder.build(application);
      this.ingressBuilder.build(application);
    }
  }

}

const app = new App();
const stack = new MyStack(app, "cdktf", applications);
stack.deploy();
app.synth();
