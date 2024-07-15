export interface Application {
    name: string,
    image: string,
    args: string[],
    port: number,
    traffic_weight: string
    replicas: string,
    isCanary: boolean
}