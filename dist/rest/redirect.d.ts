export declare class Redirect {
    path: string;
    constructor(path: string);
    resolve(): Promise<this>;
    reject(): Promise<never>;
}
export declare function redirect(path: string): Redirect;
//# sourceMappingURL=redirect.d.ts.map