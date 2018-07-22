import 'reflect-metadata';
import * as express from 'express';
import { ExpressRouter } from '@pii/server-express';
export declare class RESTExpressRouter extends ExpressRouter {
    path: string;
    private controllers;
    private router;
    constructor(path?: string);
    add(controllerModule: any): void;
    resolveController(file: string): void;
    resolveControllers(directory: string): void;
    init(server: express.Express): Promise<void>;
    private requestHandler;
}
//# sourceMappingURL=restExpressRouter.d.ts.map