import { Construct } from "constructs";
import { ResourceBuilder } from "./resourceBuilder";
import { Application } from "../interfaces/application";
import { IngressV1 } from "@cdktf/provider-kubernetes/lib/ingress-v1";

export class IngressBuilder extends ResourceBuilder {
    constructor(scope: Construct, id: string) {
        super(scope, id);
    }

    public build(input: Application) {
        const annotations: { [key: string]: string } = {
            'nginx.ingress.kubernetes.io/rewrite-target': '/',
            'nginx.ingress.kubernetes.io/canary': 'true',
            'nginx.ingress.kubernetes.io/canary-weight': input.traffic_weight,
            'kubernetes.io/ingress.class': "nginx"
        }
        new IngressV1(this.scope, `ingress-${input.name}`, {
            metadata: {
                name: input.name,
                annotations: annotations
            },
            spec: {
                ingressClassName: "nginx",
                rule: [
                    {
                        host: "bluegreenapp.com",
                        http: {
                            path: [
                                {
                                    path: "/",
                                    pathType: "Prefix",
                                    backend: {
                                        service: {
                                            name: input.name,
                                            port: {
                                                number: input.port
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        })
    }
}