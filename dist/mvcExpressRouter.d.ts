import 'reflect-metadata';
import * as express from 'express';
import { ExpressRouter } from '@pii/server-express';
export declare const ControllerToken: string;
export declare class MVCExpressRouter extends ExpressRouter {
    path: string;
    private controllers;
    private router;
    constructor(path?: string);
    resolveController(file: string): void;
    init(server: express.Express): Promise<void>;
    private requestHandler;
}
//# sourceMappingURL=mvcExpressRouter.d.ts.map