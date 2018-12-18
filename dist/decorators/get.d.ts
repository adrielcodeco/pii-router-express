export declare type GetDecoratorOptions = {
    name?: string;
    render?: string;
    useCSRF?: boolean;
};
export declare function Get(): Function;
export declare function Get(path: string): Function;
export declare function Get(options: GetDecoratorOptions): Function;
export declare function Get(path: string, name: string): Function;
export declare function Get(path: string, options: GetDecoratorOptions): Function;
//# sourceMappingURL=get.d.ts.map