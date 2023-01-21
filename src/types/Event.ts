export interface Event {
    trigger: string;
    run(args: any): void;
}