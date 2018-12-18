/// <reference types="node" />
export declare class SendFile {
    contentType: string;
    file: Buffer;
    constructor(contentType: string, file: Buffer);
    promise(): Promise<this>;
}
export declare function sendFile(contentType: string, file: Buffer): SendFile;
//# sourceMappingURL=sendFile.d.ts.map