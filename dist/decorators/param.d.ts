import 'reflect-metadata';
import express from 'express';
export declare type ParamOptions = {
    acceptHeader?: boolean;
    required?: boolean;
    validation?: (value: any, req: express.Request) => string;
};
export declare function Param(): Function;
export declare function Param(name: string): Function;
export declare function Param(options: ParamOptions): Function;
//# sourceMappingURL=param.d.ts.map