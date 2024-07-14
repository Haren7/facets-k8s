import { Construct } from "constructs";

export abstract class ResourceBuilder {
    protected readonly scope: Construct;
    protected readonly id: string;

    constructor(scope: Construct, id: string) {
        this.scope = scope;
        this.id = id;
    }

    public abstract build(input: any): any;
}