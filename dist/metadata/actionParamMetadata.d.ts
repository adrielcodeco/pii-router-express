import express from 'express';
export declare class ActionParamMetadata {
    key: string;
    name: string;
    type: string;
    index: number;
    required?: boolean;
    validation?: (value: any, req: express.Request) => string;
    acceptHeader: boolean;
    constructor(key: string, name: string, type: string, index: number);
}
//# sourceMappingURL=actionParamMetadata.d.ts.map