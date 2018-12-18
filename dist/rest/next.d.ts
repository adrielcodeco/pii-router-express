export declare class Next {
    err?: any;
    constructor(err?: any);
    resolve(): Promise<this>;
    reject(): Promise<never>;
}
export declare function next(err?: any): Next;
//# sourceMappingURL=next.d.ts.map