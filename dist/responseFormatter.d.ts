import express from 'express';
export declare type ResponseFormatter = ((req: express.Request, result: any, error: any) => any);
export declare function formatResponse(formatters: ResponseFormatter[], req: express.Request, result: any, error?: any): any;
//# sourceMappingURL=responseFormatter.d.ts.map