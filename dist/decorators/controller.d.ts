import 'reflect-metadata';
export declare type ControllerDecorationOptions = {
    name?: string;
    inject?: boolean;
    scoped?: string;
};
export declare function Controller(path?: string, options?: string | ControllerDecorationOptions): Function;
//# sourceMappingURL=controller.d.ts.map