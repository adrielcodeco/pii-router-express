import 'reflect-metadata';
import * as express from 'express';
import { ExpressRouter } from '@pii/server-express';
import { ResponseFormatter } from './responseFormatter';
export declare abstract class AbstractExpressRouter extends ExpressRouter {
    path: string;
    protected controllers: any[];
    protected router: express.Router;
    abstract responseFormatters: ResponseFormatter[];
    constructor(path?: string);
    add(controllerModule: any | any[]): void;
    addFromFolder(directory: string): void;
    resolveController(file: string): void;
    resolveControllers(directory: string): void;
    init(server: express.Express): Promise<void>;
    private requestHandler;
}
//# sourceMappingURL=abstractExpressRouter.d.ts.map