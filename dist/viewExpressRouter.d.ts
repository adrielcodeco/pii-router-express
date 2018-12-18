import 'reflect-metadata';
import { ResponseFormatter } from './responseFormatter';
import { AbstractExpressRouter } from './abstractExpressRouter';
export declare class ViewExpressRouter extends AbstractExpressRouter {
    path: string;
    responseFormatters: ResponseFormatter[];
    constructor(path?: string);
    private apiResponseFormat;
}
//# sourceMappingURL=viewExpressRouter.d.ts.map