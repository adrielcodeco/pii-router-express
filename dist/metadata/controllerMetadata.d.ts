import 'reflect-metadata';
import * as express from 'express';
import { ControllerResolver } from '../controllerResolver';
export declare class ControllerMetadata {
    path: string;
    controller: any;
    controllerResolver?: ControllerResolver;
    constructor(controller: any);
    resolveWith(file: string): void;
    use(router: express.Router): void;
    private getActions;
    private requestHandler;
    private resolveParams;
}
//# sourceMappingURL=controllerMetadata.d.ts.map