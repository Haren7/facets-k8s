import { Construct } from "constructs";
import { ResourceBuilder } from "./resourceBuilder";
import { Application } from "../interfaces/application";
import { Deployment } from "@cdktf/provider-kubernetes/lib/deployment";

export class DeploymentBuilder extends ResourceBuilder {

    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    public build(input: Application) {
        new Deployment(this.scope, `deployment-${input.name}`, {
            metadata: {
                name: input.name
            },
            spec: {
                replicas: input.replicas,
                selector: {
                    matchLabels: {
                        app: input.name
                    }
                },
                template: {
                    metadata: {
                        labels: {
                            app: input.name
                        }
                    },
                    spec: {
                        container: [
                            {
                                name: input.name,
                                image: input.image,
                                args: input.args,
                                port: [
                                    { containerPort: input.port }
                                ]
                            }
                        ]
                    }
                },
            }
        })
    }
}
