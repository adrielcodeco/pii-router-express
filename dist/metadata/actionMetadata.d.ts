import { Methods } from '../methods';
import { ActionParamMetadata } from './actionParamMetadata';
export declare class ActionMetadata {
    key: string;
    route: string;
    action: string;
    method: Methods;
    render?: string;
    useCSRF?: boolean;
    params: ActionParamMetadata[];
    middlewares: Function[];
    constructor(key: string, route: string, action: string, method: Methods);
}
//# sourceMappingURL=actionMetadata.d.ts.map