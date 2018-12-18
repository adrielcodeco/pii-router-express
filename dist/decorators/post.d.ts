export declare type PostDecoratorOptions = {
    name?: string;
    render?: string;
    useCSRF?: boolean;
};
export declare function Post(): Function;
export declare function Post(path: string): Function;
export declare function Post(options: PostDecoratorOptions): Function;
export declare function Post(path: string, name: string): Function;
export declare function Post(path: string, options: PostDecoratorOptions): Function;
//# sourceMappingURL=post.d.ts.map