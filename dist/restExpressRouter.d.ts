import 'reflect-metadata';
import { ResponseFormatter } from './responseFormatter';
import { AbstractExpressRouter } from './abstractExpressRouter';
export declare class RESTExpressRouter extends AbstractExpressRouter {
    path: string;
    responseFormatters: ResponseFormatter[];
    constructor(path?: string);
    private apiResponseFormat;
}
//# sourceMappingURL=restExpressRouter.d.ts.map