import { Construct } from "constructs";
import { ResourceBuilder } from "./resourceBuilder";
import { Application } from "../interfaces/application";
import { Service } from "@cdktf/provider-kubernetes/lib/service";

export class ServiceBuilder extends ResourceBuilder {

    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    public build(input: Application) {
        new Service(this.scope, `service-${input.name}`, {
            metadata: {
                name: input.name,
            },
            spec: {
                selector: {
                    "app": input.name
                },
                port: [
                    {
                        protocol: "TCP",
                        port: input.port,
                        targetPort: input.port.toString()
                    }
                ]
            }
        })
    }
}
