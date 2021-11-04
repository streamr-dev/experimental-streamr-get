import { StreamrGet } from './StreamrGet';
export declare class HttpGateway {
    port: number;
    getter: StreamrGet;
    constructor(privateKey: string, streamId: string, port: number);
    listen(): void;
}
